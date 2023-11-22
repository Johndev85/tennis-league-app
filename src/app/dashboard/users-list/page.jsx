"use client"

//styles
import styles from "./users.module.scss"

//libraries
import { useEffect, useState } from "react"
import axios from "axios"
import { Toaster } from "react-hot-toast"

//components
import ModalUsers from "@/components/ModalUsers/ModalUsers"

const UsersListPage = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)

  //update user
  const userUpdate = (userId) => {
    setEditingUser(users.filter((user) => user._id === userId))
    setIsModalOpen(true)
  }

  //delete user
  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`/api/users/${id}`, {
          method: "DELETE",
        })

        if (response.ok) {
          setUsers(users.filter((user) => user._id !== id))
        } else {
          console.error(`Error deleting user: ${response.statusText}`)
        }
      } catch (error) {
        console.error(`Error deleting user: ${error}`)
      }
    }
  }

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
              <div className={styles.btnForm}>
                <button onClick={() => userUpdate(user._id)}>Edit</button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => deleteUser(user._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <ModalUsers
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        userData={editingUser}
      />
      <Toaster />
    </section>
  )
}

export default UsersListPage
