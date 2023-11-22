"use client"

import styles from "./tournament.module.scss"

import { useState, useEffect } from "react"
import axios from "axios"
import Image from "next/image"
import { useSession } from "next-auth/react"
import toast, { Toaster } from "react-hot-toast"

import CardTournament from "@/components/CardTournament/CardTournament"
import ModalTournament from "@/components/ModalTournament/ModalTournament"

const TournamentPage = () => {
  const { data: session } = useSession()
  const [tournaments, setTournaments] = useState([])
  const [inscriptions, setInscriptions] = useState([])
  const [editingTournament, setEditingTournament] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formState, setFormState] = useState({
    name: "",
    initial_date: "",
    final_date: "",
    location: "",
    image: "",
  })

  // open modal update tournament
  async function editTournament(id) {
    const response = await axios.get(`/api/tournaments/${id}`)
    setEditingTournament(await response.data.data)
    setIsModalOpen(true)
  }

  //get all tournaments
  const fetchTournaments = async () => {
    const res = await axios.get("/api/tournaments")
    setTournaments(res.data.tournaments)
  }

  //get all inscriptions by tournament
  const fetchInscriptions = async (tournament_id) => {
    const res = await axios.get(`/api/tournaments/${tournament_id}/inscribe`)
    setInscriptions(res.data)
    console.log("inscriptions", inscriptions)
  }

  useEffect(() => {
    fetchTournaments()
  }, [])

  //create tournament
  async function createTournament(tournament) {
    try {
      const formData = new FormData()
      formData.append("image", tournament.image)
      const response = await fetch("/api/tournaments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: tournament.name,
          initial_date: tournament.initial_date,
          final_date: tournament.final_date,
          location: tournament.location,
          image: formData.image,
        }),
      })

      //reload list of tournaments
      fetchTournaments()

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error(`Error creating tournament: ${error}`)
      throw error
    }
  }

  //delete tournament
  async function deleteTournament(id) {
    if (window.confirm("Are you sure you want to delete this tournament?")) {
      try {
        const response = await fetch(`/api/tournaments/${id}`, {
          method: "DELETE",
        })
        if (response.ok) {
          setTournaments(
            tournaments.filter((tournament) => tournament._id !== id)
          )
          toast.success("Successfully deleted!")
        } else {
          const data = await response.json()
          toast.error(`${data.message}`, {
            duration: 2000,
          })
          console.error(`Error deleting tournament: ${response.statusText}`)
        }
      } catch (error) {
        console.error(`Error deleting tournament: ${error}`)
      }
    }
  }

  // inscribe tournament
  async function inscribeTournament(id) {
    try {
      const response = await fetch(`/api/tournaments/${id}/inscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: session.user._id,
          tournament_id: id,
        }),
      })

      if (!response.ok) {
        if (response.status === 400) {
          const data = await response.json()
          toast.error(`${data.message}`, {
            duration: 2000,
          })
        }
        fetchInscriptions(id)
        throw new Error(
          `Error registering for tournament: ${response.statusText}`
        )
      } else {
        toast.success("Inscribe Successfully", {
          duration: 2000,
        })
      }
      fetchInscriptions(id)
      return await response.json()
    } catch (error) {
      console.error(`Error registering for tournament: ${error}`)
    }
  }

  // handle input change
  const handleInputChange = (event) => {
    if (event.target.name === "image") {
      setFormState({
        ...formState,
        image: event.target.files[0],
      })
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }))
    }
  }

  //handled form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { name, initial_date, final_date, location } = formState
      if (!name || !initial_date || !final_date || !location) {
        console.error("All fields are required")
        return
      }

      await createTournament(formState)

      setFormState({
        name: "",
        initial_date: "",
        final_date: "",
        location: "",
        image: "",
      })
    } catch (error) {
      console.error(`Error handling form submission: ${error}`)
    }
  }

  return (
    <div className={styles.container}>
      {session && session.user.role === "admin" && (
        <section>
          <h1>create a tournament</h1>
          <div className={styles.topForm}>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formState.name}
                onChange={handleInputChange}
                placeholder="Tournament Name"
                required
              />
              <div className={styles.groupDate}>
                <input
                  type="date"
                  name="initial_date"
                  value={formState.initial_date}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="date"
                  name="final_date"
                  value={formState.final_date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <input
                type="text"
                name="location"
                value={formState.location}
                onChange={handleInputChange}
                placeholder="Location"
                required
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleInputChange}
              />
              <button type="submit">Create Tournament</button>
            </form>
          </div>
        </section>
      )}

      <div className={styles.list}>
        <h2 className={styles.listTitle}>Active Tournaments</h2>
        <div className={styles.cardsContainer}>
          {tournaments !== null && tournaments.length <= 0 ? (
            <span>There are no available tournaments.</span>
          ) : (
            tournaments !== null &&
            tournaments.map((tournament) => (
              <div key={tournament._id} className={styles.card}>
                {tournament.image ? (
                  <Image
                    src={tournament.image}
                    width={70}
                    height={70}
                    alt={tournament.name}
                  />
                ) : (
                  <Image
                    src={"/assets/image-demo.jpeg"}
                    width={70}
                    height={70}
                    alt={"image"}
                  />
                )}

                <div>
                  <h2>{tournament.name}</h2>
                  <div>
                    <p>
                      Start Date:
                      {new Date(tournament.initial_date).toLocaleDateString()}
                    </p>
                    <p>
                      End Date:
                      {new Date(tournament.final_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <p>Location: {tournament.location}</p>

                {session && session.user.role === "admin" && (
                  <div className={styles.btnAdmin}>
                    <button onClick={() => deleteTournament(tournament._id)}>
                      Delete
                    </button>
                    <button onClick={() => editTournament(tournament._id)}>
                      Edit
                    </button>
                  </div>
                )}
                <div className={styles.btnAdmin}>
                  <button
                    className={styles.btnInscribe}
                    onClick={() => inscribeTournament(tournament._id)}
                  >
                    Inscribe
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <ModalTournament
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        editingTournament={editingTournament}
        fetchTournaments={fetchTournaments}
      />
      <Toaster />
    </div>
  )
}

export default TournamentPage
