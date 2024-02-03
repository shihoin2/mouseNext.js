import Link from 'next/link'
import { GoQuestion } from 'react-icons/go'
import { IconContext } from 'react-icons'
import styles from './ToolBar.module.css'

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
        <div className={styles.help}>
          <Link href={'/edit/help'}>
            <IconContext.Provider value={{ color: '#bff0f6', size: '30px' }}>
              <GoQuestion />
            </IconContext.Provider>
          </Link>
        </div>
      </div>
    </div>
  )
}
