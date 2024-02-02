import styles from './AreaTitle.module.css'

export default function AreaTitle({ areaTitle }) {
  return (
      <div className={styles.areaTitle}>
        <p>{areaTitle}</p>
      </div>
  )
}
