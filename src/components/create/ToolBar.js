import styles from './ToolBar.module.css'
import { GoQuestion } from 'react-icons/go'

export default function ToolBar() {
  return (
    <div className={styles.tool_bar}>
      <div className={styles.left}>
        <div className={styles.item}>Font</div>
        <div className={styles.item}>Font Color</div>
        <div className={styles.item}>Background Color</div>
        <div className={styles.item}>Text Box Color</div>
      </div>
      <div className={styles.right}>
        <div>
          <GoQuestion />
        </div>
      </div>
    </div>
  )
}
