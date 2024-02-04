'use client'

import { useState } from 'react'
import useSWRInfinite from 'swr/infinite'
import Image from 'next/image'
import styles from './FeedMyBoard.module.css'
import Link from 'next/link'
import axios from '@/lib/axios'
import { unstable_noStore as noStore } from 'next/cache';

export default function FeedMyBoard() {
  const [ lastPage, setLastPage ] = useState()
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null;
    return `/api/feedMyBoard?page=${pageIndex + 1}`;
  }
  const fetcher = async url => {
    noStore();
    const res = await axios.get(url)
    const data = await res.data.data
    setLastPage(res.data.last_page)
    return data
  }
  const { data, size, setSize } = useSWRInfinite(getKey, fetcher)
  if (!data) return 'loading...'

  return (
    <div className={styles.feedMyBoardContainer}>
      {data && data.map((data, index) => (
        <div key={index} className={styles.myBoardList}>
          {data.map((item) => (
            <div key={item.id} className={styles.myBoardItem}>
              <Link href={`/edit?board_id=${item.id}`} className={styles.templateUrl}>
                <Image
                    // src={item.board_thumbnail}
                    src={`/thumbnails/{item.board_thumbnail}`}
                    priority={true}
                    width={500}
                    height={500}
                    alt={`テンプレート${item.id}`}
                    className={styles.myBoardImage}
                />
                <div className={styles.caption}>Edit</div>
              </Link>
            </div>
          ))}
        </div>
      ))}
      {
        size < lastPage &&
        <div className={styles.loadButtonWrapper}>
          <button onClick={() => setSize(size+1)} className={styles.loadButton}>Load more</button>
        </div>
      }
    </div>
  )
}
