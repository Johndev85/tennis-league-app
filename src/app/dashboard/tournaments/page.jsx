"use client"

import styles from "./tournament.module.scss"

import { useState, useEffect } from "react"
import axios from "axios"
import Image from "next/image"

import CardTournament from "@/components/CardTournament/CardTournament"

const TournamentPage = () => {
  const [tournaments, setTournaments] = useState([])
  const [formState, setFormState] = useState({
    name: "",
    initial_date: "",
    final_date: "",
    location: "",
    image: "",
  })

  const fetchTournaments = async () => {
    const res = await axios.get("/api/tournaments")
    console.log("res", res)
    setTournaments(res.data.tournaments)
  }

  useEffect(() => {
    fetchTournaments()
  }, [])

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

  console.log("tournaments", tournaments)

  async function updateTournament(id, tournament) {
    try {
      const response = await axios.put(`/api/tournaments/${id}`, tournament)
      return response.data
    } catch (error) {
      console.error(`Error updating tournament: ${error}`)
      throw error
    }
  }

  const deleteTournament = async (id) => {
    try {
      await axios.delete(`/api/tournaments/${id}`)
      setTournaments(tournaments.filter((tournament) => tournament._id !== id))
    } catch (error) {
      console.error(`Error deleting tournament: ${error}`)
    }
  }

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { name, initial_date, final_date, location } = formState
      if (!name || !initial_date || !final_date || !location) {
        console.error("All fields are required")
        return
      }

      if (formState._id) {
        await updateTournament(formState._id, formState)
      } else {
        await createTournament(formState)
      }
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
    <section className={styles.container}>
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
          {/* <button
            type="submit"
            onClick={updateTournament}
            style={{ display: formState._id ? "block" : "none" }}
          >
            Update Tournament
          </button> */}
        </form>
      </div>

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
                      End Date:{" "}
                      {new Date(tournament.final_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <p>Location: {tournament.location}</p>

                <button onClick={() => deleteTournament(tournament._id)}>
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default TournamentPage
