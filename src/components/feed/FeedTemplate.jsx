'use client'

import { useState } from 'react'
import useSWRInfinite from 'swr/infinite'
import Image from 'next/image'
import styles from './FeedTemplate.module.css'
import Link from 'next/link'
import axios from '@/lib/axios'

export default function FeedTemplate() {
  const [lastPage, setLastPage] = useState()
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null
    return `/api/feedTemplate?page=${pageIndex + 1}`
  }
  const fetcher = async url => {
    const res = await axios.get(url)
    const data = await res.data.data
    setLastPage(res.data.last_page)
    return data
  }
  const { data, size, setSize } = useSWRInfinite(getKey, fetcher)
  if (!data) return 'loading...'

  console.log(data)
  return (
    <div className={styles.feedTemplateContainer}>
      {data &&
        data.map((data, index) => (
          <div key={index} className={styles.templateList}>
            {data.map(item => (
              <div key={item.id} className={styles.templateItem}>
                <Link
                  href={`/create?tmp=${item.id}`}
                  className={styles.templateUrl}>
                  <Image
                    src={item.thumbnail}
                    priority={true}
                    width={500}
                    height={500}
                    alt={`テンプレート${item.id}`}
                    className={styles.templateImage}
                  />
                  <div className={styles.caption}>Create New</div>
                </Link>
              </div>
            ))}
          </div>
        ))}
      {size < lastPage && (
        <div className={styles.loadButtonWrapper}>
          <button
            onClick={() => setSize(size + 1)}
            className={styles.loadButton}>
            Load more
          </button>
        </div>
      )}
    </div>
  )
}
