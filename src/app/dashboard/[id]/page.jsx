"use client"

//styles
import styles from "./dashboard.module.scss"

//libraries
import { useState, useEffect, useCallback, useMemo } from "react"
import { useSession } from "next-auth/react"
import axios from "axios"
import { Toaster } from "react-hot-toast"

//components
import Loader from "@/components/Loader/Loader"
import CardTournament from "@/components/CardTournament/CardTournament"

const ProfilePage = () => {
  const { data: session, status } = useSession()
  const [inscriptions, setInscriptions] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  //get all inscriptions by user
  const fetchInscriptions = useCallback(async (user_id) => {
    setIsLoading(true)
    const res = await axios.get(`/api/tournaments/${user_id}/inscribe`)

    const filteredInscriptions = res.data.inscriptions.filter(
      (inscription) => inscription.user_id === user_id
    )

    setInscriptions(filteredInscriptions)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?._id || session?.user?.id) {
        await fetchInscriptions(
          session.user?._id ? session.user?._id : session.user?.id
        )
      }
    }

    fetchData()
  }, [session, setInscriptions, fetchInscriptions])

  const refreshList = useCallback(() => {
    fetchInscriptions(session.user?._id ? session.user?._id : session.user?.id)
  }, [session, fetchInscriptions])

  if (status === "loading") return <Loader />
  if (!session) return <div>Please sign in</div>

  return (
    <>
      <section className={styles.board}>
        <h1>
          Welcome
          <span>
            {`${
              session.user?.username
                ? session.user?.username
                : session.user?.name
            }!`}
          </span>
        </h1>

        <span>Account details:</span>

        <div className={styles.content}>
          <p>
            <strong>id: </strong>
            {session.user?._id ? session.user?._id : session.user?.id}
          </p>
          <p>
            <strong> name: </strong>
            {session.user?.username
              ? session.user?.username
              : session.user?.name}
          </p>
          <p>
            <strong>email: </strong>
            {session.user?.email}
          </p>
          <p>
            <strong> role:</strong>
            {session.user?.role ? session.user?.role : "Google User"}
          </p>
        </div>

        <section className={styles.listcontent}>
          <div className={styles.title}>
            <h2>Active Inscriptions:</h2>
          </div>

          <div className={styles.cardsContent}>
            {isLoading ? (
              <Loader />
            ) : inscriptions.length <= 0 ? (
              <div>
                <p> No inscriptions</p>
              </div>
            ) : (
              inscriptions.map((inscription) => {
                return (
                  <CardTournament
                    key={inscription.tournament_id}
                    inscription={inscription}
                    refreshList={refreshList}
                  />
                )
              })
            )}
          </div>
        </section>
        <Toaster />
      </section>
    </>
  )
}

export default ProfilePage
