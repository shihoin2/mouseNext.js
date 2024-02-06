'use client'
import { useCallback, useEffect } from 'react'

import { useState } from 'react'
import useSWRInfinite from 'swr/infinite'
import Image from 'next/image'
import styles from './FeedMyBoard.module.css'
import Link from 'next/link'
import axios from '@/lib/axios'
import { unstable_noStore as noStore } from 'next/cache'

export default function FeedMyBoard() {
  const [lastPage, setLastPage] = useState()
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null
    return `/api/feedMyBoard?page=${pageIndex + 1}`
  }

  const fetcher = async url => {
    noStore()
    const res = await axios.get(url)
    const data = await res.data.data
    setLastPage(res.data.last_page)
    return data
  }

  const { data, size, setSize } = useSWRInfinite(getKey, fetcher)
  if (!data) return 'loading...'

  const downloadImage = async (imagUrl) => {
    try {
      // base64に変換された画像が返ってくる(DownloadController参照)
      const response = await axios.get(`/api/download?imageUrl=${imagUrl}`)
      // 一時的にdownload属性aタグを作成して強制クリック->ダウンロード
      const link = document.createElement('a')
      // pngの部分は画像の拡張子に合わせて変更
      link.href = `data: png;base64 ,${response.data}`
      link.download = 'myVision.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error fetching image:', error)
    }
  }

      return (
      <div className={styles.feedMyBoardContainer}>
        {data && data.map((data, index) => (
          <div key={index} className={styles.myBoardList}>
            {data.map((item) => (
              <div key={item.id} className={styles.myBoardItem}>
                <div  className={styles.templateUrl}>
                  <Image
                      src={item.board_thumbnail}
                      priority={true}
                      width={500}
                      height={500}
                      alt={`テンプレート${item.id}`}
                      className={styles.myBoardImage}
                  />
                  {<div className={styles.downloadButtonWrapper}>
                    <button onClick={() => downloadImage(item.board_thumbnail)} className={styles.downloadButton}>Download</button>
                  </div>}
                </div>
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
