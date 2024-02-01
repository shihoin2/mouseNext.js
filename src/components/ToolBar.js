import styles from './ToolBar.module.css'

export default function ToolBar() {
  return (
    <div className={styles.tool_bar}>
      <div className={styles.item}>Font</div>
      <div className={styles.item}>Font Color</div>
      <div className={styles.item}>Background Color</div>
      <div className={styles.item}>Text Box Color</div>
    </div>
  )
}
