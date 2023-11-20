"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { signIn, useSession, signOut } from "next-auth/react"

export default function Home() {
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    router.push(
      `/dashboard/${session?.user?.username}`,
      `/${session?.user?.username}`
    )
  }, [router, session])

  return null
}
