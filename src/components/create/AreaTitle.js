import styles from './AreaTitle.module.css'

export default function AreaTitle({ areaTitle, titleStyle }) {
  return (
      <div className={`${styles[titleStyle]}`}>
        <p>{areaTitle}</p>
      </div>
  )
}
