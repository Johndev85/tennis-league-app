"use client"

import { FormEvent, useState } from "react"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

const googleIcon = "/assets/google-icon.svg"

import styles from "./login.module.scss"

function Login() {
  const [error, setError] = useState("")
  const router = useRouter()

  const handleGoogleLogin = () => {
    signIn("google") // Inicia sesión con Google
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    })

    if (res?.error) return setError(res.error)

    if (res?.ok) return router.push(`/dashboard/${formData.get("email")}`)
  }

  return (
    <div className={styles.container}>
      <h1>Welcome back</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <div className={styles.error}>{error}</div>}

        <label>Email:</label>
        <input type="email" placeholder="Email" className="" name="email" />

        <label>Password:</label>
        <input type="password" placeholder="Password" name="password" />
        <input type="submit" value="Login" />

        <div className={styles.middle}>
          <p>
            Dont have an account? <Link href="/register">Sign up</Link>
          </p>
        </div>

        <div className={styles.middle}>
          <span>or</span>
        </div>

        <button className={styles.btnGoogle} onClick={handleGoogleLogin}>
          <Image
            src={googleIcon}
            alt="google"
            width={20}
            height={20}
            Login
            with
            Google
          />
          Login with Google
        </button>
      </form>
    </div>
  )
}

export default Login
