"use client"

//styles
import styles from "./dashboard.module.scss"

//libraries
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import axios from "axios"

//components
import Loader from "@/components/Loader/Loader"
import CardTournament from "@/components/CardTournament/CardTournament"

const ProfilePage = () => {
  const { data: session, status } = useSession()
  const [inscriptions, setInscriptions] = useState([])

  useEffect(() => {
    const fetchInscriptions = async (user_id) => {
      const res = await axios.get(`/api/tournaments/${user_id}/inscribe`)
      console.log("res", res)
      const filteredInscriptions = res.data.inscriptions.filter(
        (inscription) => inscription.user_id === user_id
      )
      setInscriptions(filteredInscriptions)
      console.log("inscriptions", filteredInscriptions)
    }

    if (session?.user?._id) {
      fetchInscriptions(session.user._id)
    }
  }, [session, setInscriptions])

  if (status === "loading") return <Loader />
  if (!session) return <div>Please sign in</div>

  return (
    <>
      <section className={styles.board}>
        <h1>
          Welcome <span> {` ${session.user?.username}!`} </span>
        </h1>

        <h4>Account details:</h4>

        <div className={styles.content}>
          <p>
            <strong>id: </strong> {session.user?._id}
          </p>
          <p>
            <strong> name: </strong>
            {session.user?.username}
          </p>
          <p>
            <strong>email: </strong>
            {session.user?.email}
          </p>
          <p>
            <strong> role:</strong> {session.user?.role}
          </p>
        </div>

        <section className={styles.listcontent}>
          <div className={styles.title}>
            <h3>Active Inscriptions:</h3>
          </div>

          <div className={styles.cardsContent}>
            {inscriptions.length <= 0 ? (
              <div>
                <p> No inscriptions</p>
              </div>
            ) : (
              inscriptions.map((inscription) => {
                return (
                  <CardTournament
                    key={inscription.tournament_id}
                    tournament={inscription}
                  />
                )
              })
            )}
          </div>
        </section>
      </section>
    </>
  )
}

export default ProfilePage
