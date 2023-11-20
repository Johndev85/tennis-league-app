import { Inter } from "next/font/google"
import "./globals.scss"
import Providers from "./Providers"

//components
import Navbar from "@/components/Navbar/Navbar"
import SideBar from "@/components/SideBar/SideBar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Tennis League",
  description: "Tennis League App",
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          <header>
            <Navbar />
          </header>
          <section className="layout">
            <SideBar />
            {children}
          </section>
        </Providers>
      </body>
    </html>
  )
}
