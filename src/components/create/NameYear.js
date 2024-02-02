import styles from './NameYear.module.css'

export default function NameYear({ year, name }) {
  return (
      <div className={styles.nameYear}>
        <p>{name}</p>
        <p>{year}</p>
      </div>
  )
}
