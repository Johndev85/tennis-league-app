import styles from "./loader.module.scss"

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.lds_ring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loader
