"use client"

import toast from "react-hot-toast"
import styles from "./cardTournament.module.scss"

//libraries
import Image from "next/image"
import React from "react"

const CardTournament = React.memo(({ inscription, refreshList }) => {
  const {
    tournament_name,
    tournament_id,
    initial_date,
    final_date,
    location,
    image,
    _id,
    user_id,
  } = inscription

  // delete inscription
  const deleteInscription = async (inscription_id, user_id) => {
    try {
      const res = await fetch(
        `/api/tournaments/${inscription_id}/inscribe/${user_id}`,
        {
          method: "DELETE",
        }
      )
      const data = await res.json()

      if (!res.ok) {
        toast.error(data.message)
        throw new Error(data.message)
      }

      toast.success("Inscription deleted successfully")
      refreshList()
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className={styles.cardsContainer}>
      <div className={styles.card}>
        {image ? (
          <Image src={image} width={70} height={70} alt={tournament_name} />
        ) : (
          <Image
            src={"/assets/image-demo.jpeg"}
            width={70}
            height={70}
            alt={"image"}
          />
        )}

        <div className={styles.content}>
          <h3>{tournament_name}</h3>
          <div>
            <p>
              <span>Starting:</span>
              {new Date(initial_date).toLocaleDateString()}
            </p>
            <p>
              <span>It ends: </span>
              {new Date(final_date).toLocaleDateString()}
            </p>
            <p>
              <span>ID Tournament: </span> <small>{tournament_id}</small>
            </p>
          </div>
        </div>

        <p>
          <span>Location: </span> {location}
        </p>
        <div className={styles.btnAdmin}>
          <button
            className={styles.deleteBtn}
            onClick={() => deleteInscription(_id, user_id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
})

CardTournament.displayName = "CardTournament"

export default CardTournament
