"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/router"
import Navbar from "@/components/Navbar/Navbar"

function ProfilePage() {
  const { data: session, status } = useSession()

  console.log(session, status)

  return (
    <div className="">
      <h1 className="">Profile: </h1>

      <pre className="">
        {JSON.stringify(
          {
            session,
            status,
          },
          null,
          2
        )}
      </pre>

      <button
        className=""
        onClick={() => {
          signOut()
        }}
      >
        Signout
      </button>
    </div>
  )
}

export default ProfilePage
