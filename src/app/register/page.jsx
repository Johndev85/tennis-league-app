"use client"

import { FormEvent, useState } from "react"
import axios, { AxiosError } from "axios"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import styles from "./register.module.scss"

const Register = () => {
  const [error, setError] = useState()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData(e.currentTarget)
      const signupResponse = await axios.post("/api/auth/register", {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
      })
      console.log(signupResponse)
      const res = await signIn("credentials", {
        email: signupResponse.data.email,
        password: formData.get("password"),
        redirect: false,
      })

      if (res?.ok) return router.push("/dashboard/profile")
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.message
        setError(errorMessage)
      }
    }
  }

  return (
    <section className={styles.container}>
      <h1>Create your account</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <div className={styles.error}>{error}</div>}
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />

        <input type="submit" value="Register" />
        <p>
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </form>
    </section>
  )
}

export default Register
