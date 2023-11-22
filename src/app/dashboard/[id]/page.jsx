"use client"

//styles
import styles from "./dashboard.module.scss"

//libraries
import { useSession, signOut } from "next-auth/react"

//pages
import UsersListPage from "../users-list/page"

const ProfilePage = () => {
  const { data: session, status } = useSession()

  return (
    <>
      {session?.user?.role === "admin" ? (
        <UsersListPage />
      ) : (
        <section className={styles.board}>
          <h1 className="">no es admin </h1>

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
        </section>
      )}
    </>
  )
}

export default ProfilePage
