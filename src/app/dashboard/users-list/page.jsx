"use client"

//styles
import styles from "./users.module.scss"

//libraries
import { useEffect, useState } from "react"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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

  if (loading)
    return (
      <div className={styles.loading}>
        <Loader />
      </div>
    )

  return (
    <section className={styles.container}>
      <h1>admin dashboard </h1>

      <h2>registered users</h2>

      <div className={styles.table}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className="text-right">
                  {
                    <div className={styles.btnForm}>
                      <button onClick={() => userUpdate(user._id)}>Edit</button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => deleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </div>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

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
