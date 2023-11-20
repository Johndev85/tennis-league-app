"use client"

import { FormEvent, useState } from "react"
import { AxiosError } from "axios"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

import styles from "./login.module.scss"

function Signin() {
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    })

    if (res?.error) return setError(res.error)

    if (res?.ok) return router.push("/dashboard/profile")
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <div className={styles.error}>{error}</div>}
        <h1>Login</h1>

        <label>Email:</label>
        <input type="email" placeholder="Email" className="" name="email" />

        <label>Password:</label>
        <input type="password" placeholder="Password" name="password" />

        <input type="submit" value="Login" />
      </form>
    </div>
  )
}

export default Signin
