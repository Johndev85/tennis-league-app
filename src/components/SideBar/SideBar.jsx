import styles from "./sidebar.module.scss"

import Link from "next/link"

const SideBar = () => {
  return (
    <section className={styles.sidebar}>
      <ul>
        <li>
          <Link href="/users"> users</Link>
        </li>
        <li>
          <Link href="/tournaments">tournaments </Link>
        </li>
      </ul>
    </section>
  )
}

export default SideBar
