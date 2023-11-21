"use client"

import styles from "./tournament.module.scss"

import { useState, useEffect } from "react"
import axios from "axios"
import Image from "next/image"

const TournamentPage = () => {
  const [tournaments, setTournaments] = useState([])
  const [formState, setFormState] = useState({
    name: "",
    initial_date: "",
    final_date: "",
    location: "",
    image: "",
  })

  // useEffect(() => {
  //   const fetchTournaments = async () => {
  //     const res = await axios.get("/api/tournaments")
  //     setTournaments(res.data)
  //   }

  //   fetchTournaments()
  // }, [])

  async function createTournament(tournament) {
    console.log("tournament", tournament)
    try {
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
          image: tournament.image,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`Error creating tournament: ${error}`)
      throw error
    }
  }

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
    setFormState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
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
            value={formState.image}
            onChange={handleInputChange}
            placeholder="Image URL"
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
        <h2>Active Tournaments</h2>
        {tournaments.length <= 0 ? (
          <span> No tournaments.</span>
        ) : (
          tournaments.map((tournament) => (
            <div key={tournament._id}>
              <h2>{tournament.nombre}</h2>
              <p>
                Start Date:
                {new Date(tournament.fecha_inicio).toLocaleDateString()}
              </p>
              <p>
                End Date: {new Date(tournament.fecha_fin).toLocaleDateString()}
              </p>
              <p>Location: {tournament.ubicacion}</p>
              <Image src={tournament.imagen} alt={tournament.nombre} />
              <button onClick={() => deleteTournament(tournament._id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default TournamentPage
