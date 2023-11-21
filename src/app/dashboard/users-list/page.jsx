"use client"

//styles
import styles from "./users.module.scss"

//libraries
import { useEffect, useState } from "react"
import Link from "next/link"
import axios from "axios"

const UsersListPage = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get("/api/users")
      .then((response) => {
        setUsers(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error:", error)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <section className={styles.container}>
      <h1>dashboard admin</h1>

      <h2>Users List</h2>

      <ul className={styles.table}>
        <div className={styles.titles}>
          <li>
            <span className={styles.cell}>Username</span>
          </li>
          <li>
            <span className={styles.cell}>Email</span>
          </li>
          <li>
            <span className={styles.cell}>Role</span>
          </li>
        </div>

        {users.map((user) => (
          <li key={user._id}>
            <div className={styles.row}>
              <span className={styles.cell}>{user.username}</span>
              <span className={styles.cell}>{user.email}</span>
              <span className={styles.cell}>{user.role}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default UsersListPage
