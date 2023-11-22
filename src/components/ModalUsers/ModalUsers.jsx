"use client"

//styles
import styles from "./modalUser.module.scss"

//libraries
import { useState } from "react"
import toast from "react-hot-toast"

const ModalUsers = ({ isModalOpen, setIsModalOpen, userData, refreshList }) => {
  const [error, setError] = useState()
  const [formStateUser, setFormStateUser] = useState({
    username: "",
    email: "",
    role: "",
  })

  if (!isModalOpen) {
    return null
  }

  //update user
  async function updateUser(id, updateData) {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      })
      if (!response.ok) {
        throw new Error(`Error updating tournament: ${response.statusText}`)
      }

      setIsModalOpen(false)
      toast.success("Successfully updated!")
      refreshList()
      return await response.json()
    } catch (error) {
      console.error(`Error updating tournament: ${error}`)
      throw error
    }
  }

  //handle input changes
  const handleInputChange = (event) => {
    setFormStateUser((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!userData) {
      console.error("User data is not loaded")
      return
    }

    try {
      setFormStateUser((prevState) => ({
        ...prevState,
      }))
      await updateUser(userData[0]._id, formStateUser)
    } catch (error) {
      setError(error.message)
      console.error(`Error handling form submission: ${error}`)
    }
  }

  return (
    <div className={styles.modal}>
      <section className={styles.modalContent}>
        <div className={styles.modalTopBtn}>
          <button onClick={() => setIsModalOpen(false)}>X</button>
        </div>
        <div className={styles.modalTitle}>
          <h2>Editing {`${userData[0].username}`}</h2>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={handleInputChange}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleInputChange}
            required
          />
          <label htmlFor="role">Rol</label>
          <select name="role" onChange={handleInputChange} required>
            <option value="" defaultValue>
              Select a role
            </option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <input
            className={styles.btnRegister}
            type="submit"
            value="Update User"
          />
        </form>
      </section>
    </div>
  )
}

export default ModalUsers
