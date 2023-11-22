"use client"

import { useState } from "react"

import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

const googleIcon = "/assets/google-icon.svg"

import styles from "./login.module.scss"

function Login() {
  const [error, setError] = useState("")
  const router = useRouter()
  const { data: session, status } = useSession()

  const handleGoogleLogin = () => {
    signIn("google")
  }

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
    status !== "authenticated" && (
      <div className={styles.container}>
        <h1>Welcome back</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <label>Email:</label>
          <input
            type="email"
            placeholder="Email address"
            className=""
            name="email"
          />

          <label>Password:</label>
          <input type="password" placeholder="Password" name="password" />
          <input className={styles.btnLogin} type="submit" value="Login" />

          <div className={styles.middle}>
            <p>
              Dont have an account? <Link href="/register">Sign up</Link>
            </p>
          </div>

          <div className={styles.middle}>
            <small>or</small>
          </div>

          <button className={styles.btnGoogle} onClick={handleGoogleLogin}>
            <Image src={googleIcon} alt="google" width={20} height={20} />
            Login with Google
          </button>
        </form>
      </div>
    )
  )
}

export default Login
