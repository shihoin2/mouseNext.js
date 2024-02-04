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
  const [imageData, setImageData] = useState('')

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

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/download`, {
        responseType: 'arraybuffer',
      })
      if (response.status === 200) {
        const base64Data = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            '',
          ),
        )
        const imageDataUrl = `data:${response.headers['content-type']};base64,${base64Data}`
        setImageData(imageDataUrl)
      } else {
        console.error('Failed to fetch image')
      }
    } catch (error) {
      console.error('Error fetching image:', error)
    }
  }

  const handleDownload = (url) => {
    // クリック時にダウンロードリンクを生成
    const link = document.createElement('a')
    link.href = imageData
    link.download = 'myVision.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

    // return (
    //   <div>
    //     <div onClick={fetchData()}></div>
    //     {imageData && (
    //       <div>
    //         <button onClick={handleDownload}>Download Image</button>
    //       </div>
    //     )}
    //   </div>
    // );


  //  return (
  //    <div className={styles.feedMyBoardContainer}>
  //    <button onClick={download}>ダウンロードするよ</button>

  //    <div>
  //      <button onClick={fetchData}>Fetch Image</button>
  //      {imageData && (
  //        <div>
  //          <img src={imageData} alt="My Vision" />
  //          <button onClick={handleDownload}>Download Image</button>
  //        </div>
  //      )}
  //    </div>
  //    </div>
  //  )

      return (
      <div className={styles.feedMyBoardContainer}>
        {data && data.map((data, index) => (
          <div key={index} className={styles.myBoardList}>
            {data.map((item) => (
              <div key={item.id} className={styles.myBoardItem}>
                {/* <Link href={``} className={styles.templateUrl}> */}
                <div onClick={fetchData()} className={styles.templateUrl}>
                  <Image
                      src={item.board_thumbnail}
                      priority={true}
                      width={500}
                      height={500}
                      alt={`テンプレート${item.id}`}
                      className={styles.myBoardImage}
                  />
                  {/* <div className={styles.caption}>Edit</div> */}
                  {imageData && (
                  <div className={styles.downloadButtonWrapper}>
                    <button onClick={handleDownload} className={styles.downloadButton}>Download</button>
                  </div>
                )}
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
