//components
import Navbar from "@/components/Navbar/Navbar"
import SideBar from "@/components/SideBar/SideBar"

import styles from "./layout.module.scss"

export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section>
      <header>
        <Navbar />
      </header>
      <section className={styles.layout}>
        <SideBar />
        {children}
      </section>
    </section>
  )
}
