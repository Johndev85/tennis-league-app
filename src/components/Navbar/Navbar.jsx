"use client"

import Link from "next/link"
import { signIn, useSession, signOut } from "next-auth/react"
import Image from "next/image"

import styles from "./navbar.module.scss"

function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className={styles.container}>
      <div className={styles.logo}>
        <Link href="/">
          <Image
            src="/assets/liga-icon.png"
            alt="logo"
            width={80}
            height={80}
          />
          <span>Tennis League</span>
        </Link>
      </div>

      {session?.user ? (
        <div className={styles.navbar}>
          <p>
            {session.user.username ? session.user.username : session.user.name}
          </p>
          {session.user.image && (
            <Image
              src={session.user.image}
              alt="avatar"
              width={40}
              height={40}
            />
          )}

          <button
            onClick={async () => {
              await signOut({
                callbackUrl: "/",
              })
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <button onClick={() => signIn()}>Sign In</button>
      )}
    </nav>
  )
}
export default Navbar
