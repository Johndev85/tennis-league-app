import { Inter } from "next/font/google"
import "./globals.scss"
import Providers from "./Providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Tennis League",
  description: "Tennis League App",
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
