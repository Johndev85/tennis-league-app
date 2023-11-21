"use client"

import styles from "./sidebar.module.scss"

//libraries
import Link from "next/link"
import { useSession } from "next-auth/react"

const SideBar = () => {
  const { data: session } = useSession()

  return (
    <section className={styles.sidebar}>
      <ul>
        {session && session.user.role === "admin" && (
          <li>
            <Link href="/dashboard/users-list"> users</Link>
          </li>
        )}

        <li>
          <Link href="/dashboard/tournaments">tournaments </Link>
        </li>
      </ul>
    </section>
  )
}

export default SideBar
