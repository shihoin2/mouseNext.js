'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { GoQuestion } from 'react-icons/go'
import { IconContext } from 'react-icons'
import styles from './ToolBar.module.css'


export default function ToolBar() {
  const query = useSearchParams()
  const board_id = query.get('board_id')

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
          <Link href={`/edit/help?board_id=${board_id}`}>
            <IconContext.Provider value={{ color: '#bff0f6', size: '30px' }}>
              <GoQuestion />
            </IconContext.Provider>
          </Link>
        </div>
      </div>
    </div>
  )
}
