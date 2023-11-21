"use client"

import { FormEvent, useState } from "react"
import axios, { AxiosError } from "axios"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"

import styles from "./register.module.scss"

const Register = () => {
  const [error, setError] = useState()
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    if (session) {
      router.push(
        `  /dashboard/${
          session.user.username ? session.user.username : session.user.email
        }`
      )
    }
  }, [router, session])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData(e.currentTarget)
      const signupResponse = await axios.post("/api/auth/signup", {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        role: "user",
      })
      const res = await signIn("credentials", {
        email: signupResponse.data.email,
        password: formData.get("password"),
        redirect: false,
      })

      if (res?.ok)
        return router.push(`/dashboard/${signupResponse.data.username}`)
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.message
        setError(errorMessage)
      }
    }
  }

  return (
    status !== "authenticated" && (
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
  )
}

export default Register
