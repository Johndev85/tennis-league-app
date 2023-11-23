"use client"

//styles
import styles from "./modal.module.scss"

import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"

const ModalTournament = ({
  isModalOpen,
  setIsModalOpen,
  editingTournament,
  fetchTournaments,
}) => {
  const [formStateUpdate, setFormStateUpdate] = useState(editingTournament)

  if (!isModalOpen) {
    return null
  }

  //update tournament
  async function updateTournament(id, updateData) {
    try {
      const response = await fetch(`/api/tournaments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      })
      if (!response.ok) {
        if (response.status === 400) {
          const data = await response.json()
          toast.error(`${data.message}`, {
            duration: 2000,
          })
        }
        throw new Error(`Error updating tournament: ${response.statusText}`)
      } else {
        toast.success("Successfully updated!")
      }

      fetchTournaments()
      setIsModalOpen(false)
      return await response.json()
    } catch (error) {
      console.error(`Error updating tournament: ${error}`)
      throw error
    }
  }

  //handle input changes
  const handleInputChangeUpdate = (event) => {
    if (event.target.name === "image") {
      setFormStateUpdate({
        ...formStateUpdate,
        image: event.target.files[0],
      })
    } else {
      setFormStateUpdate((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }))
    }
  }

  //handled form submission
  const handleUpdateSubmit = async (e) => {
    e.preventDefault()

    try {
      await updateTournament(editingTournament._id, formStateUpdate)
    } catch (error) {
      console.error(`Error handling form submission: ${error}`)
    }
  }

  // const modalElement = document.createElement("div")
  // modalElement.id = "modal-root"
  // document.body.appendChild(modalElement)

  return (
    <div className={styles.modal}>
      {
        <div className={styles.modalContent}>
          <div className={styles.modalTopBtn}>
            <button onClick={() => setIsModalOpen(false)}>X</button>
          </div>

          <div className={styles.modalTitle}>
            <h2>edit tournament</h2>
          </div>

          <div className={styles.topForm}>
            <form onSubmit={handleUpdateSubmit}>
              <input
                type="text"
                name="name"
                defaultValue={editingTournament.name}
                onChange={handleInputChangeUpdate}
                placeholder="Tournament Name"
                required
              />
              <div className={styles.groupDate}>
                <input
                  type="date"
                  name="initial_date"
                  onChange={handleInputChangeUpdate}
                  required
                />
                <input
                  type="date"
                  name="final_date"
                  onChange={handleInputChangeUpdate}
                  required
                />
              </div>

              <input
                type="text"
                name="location"
                onChange={handleInputChangeUpdate}
                placeholder="Location"
                required
              />
              {/* <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleInputChangeUpdate}
              /> */}

              <button type="submit">Update Tournament</button>
            </form>
          </div>
        </div>
      }
    </div>
  )
}

export default ModalTournament
