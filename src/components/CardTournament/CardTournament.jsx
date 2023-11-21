"use client"

import styles from "./cardTournament.module.scss"

//libraries
import Image from "next/image"

const CardTournament = ({ tournament }) => {
  const { name, initial_date, final_date, location, image } = tournament

  return (
    <div className={styles.card}>
      <div className={styles.cardImg}>
        <Image src={image} alt={name} />
      </div>
      <div className={styles.cardInfo}>
        <h1>{name}</h1>
        <p>{location}</p>
        <div className={styles.cardDate}>
          <p>{initial_date}</p>
          <p>{final_date}</p>
        </div>
      </div>
    </div>
  )
}

export default CardTournament
