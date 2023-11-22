"use client"

//styles
import styles from "./users.module.scss"

//libraries
import { useEffect, useState } from "react"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"

//components
import ModalUsers from "@/components/ModalUsers/ModalUsers"
import Loader from "@/components/Loader/Loader"

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
          toast.success("User deleted successfully")
        } else {
          const data = await response.json()
          toast.error(`${data.message}`, {
            duration: 2000,
          })
          console.error(`Error deleting user: ${response.statusText}`)
          toast.error("Error deleting user")
        }
      } catch (error) {
        console.error(`Error deleting user: ${error}`)
      }
    }
  }

  //get list
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/users")
      setUsers(response.data)
      setLoading(false)
    } catch (error) {
      console.error("Error:", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) return <Loader />

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
        refreshList={fetchData}
      />
      <Toaster />
    </section>
  )
}

export default UsersListPage
