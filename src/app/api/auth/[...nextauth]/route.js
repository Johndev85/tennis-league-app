import { connectDB } from "@/utils/dbConnect"
import User from "@/models/User"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcryptjs"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jdoe" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "••••••",
        },
      },
      async authorize(credentials) {
        await connectDB()
        const userFound = await User.findOne({
          email: credentials?.email,
        }).select("+password")

        if (!userFound) throw new Error("Invalid credentials")

        const passwordMatch = await bcrypt.compare(
          credentials?.password,
          userFound.password
        )

        if (!passwordMatch) throw new Error("Invalid credentials")

        console.log(userFound)

        return userFound
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user
      return token
    },
    async session({ session, token }) {
      session.user = token.user
      return session
    },
  },
})

export { handler as GET, handler as POST }
