"use client"

import styles from "./cardTournament.module.scss"

//libraries
import Image from "next/image"

const CardTournament = ({ tournament }) => {
  const {
    tournament_name,
    tournament_id,
    initial_date,
    final_date,
    location,
    image,
  } = tournament

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
          <h2>{tournament_name}</h2>
          <div>
            <p>
              <span>Start Date:</span>
              {new Date(initial_date).toLocaleDateString()}
            </p>
            <p>
              <span>End Date: </span>
              {new Date(final_date).toLocaleDateString()}
            </p>
          </div>
        </div>

        <p>
          <span>Location: </span> {location}
        </p>
      </div>
    </div>
  )
}

export default CardTournament
