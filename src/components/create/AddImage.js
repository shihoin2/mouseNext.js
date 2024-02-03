'use client'
import { useState, useRef } from 'react'
import axios from '@/lib/axios'
import Image from 'next/image'
import styles from './AddImage.module.css'
import { useSearchParams, usePathname } from 'next/navigation'

export default function AddImage({ imageStyle, imageCategory, imagePlace }) {
  const [imagePath, setImagePath] = useState(null)
  const [showDeleteButton, setShowDeleteButton] = useState(false)
  const fileInputRef = useRef(null)

  // const url = usePathname();
  // console.log(url);
  const searchParams = useSearchParams()
  const board_id = searchParams.get('board_id')
  // console.log(board_id);

  const handleFileChange = async e => {
    const file = e.target.files[0]
    if (file) {
      await uploadImage(file)
    }
  }

  const uploadImage = async file => {
    const formData = new FormData()
    formData.append('image', file)
    try {
      // const response = await axios.post(`http://127.0.0.1:8000/api/vision/1`, formData);
      const response = await axios.post(
        `/api/vision_boards/${board_id}`,
        formData,
      )
      if (response.data && response.data.image_url) {
        console.log(response.data.image_url)
        setImagePath(response.data.image_url)
        setShowDeleteButton(true)
        console.log(imagePath)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteClick = () => {
    setImagePath(null)
    setShowDeleteButton(false)
  }

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div
      className={`${styles['imageContent']} ${styles[imageStyle]} ${styles[imageCategory]}`}
      onMouseEnter={() => setShowDeleteButton(true)}
      onMouseLeave={() => setShowDeleteButton(false)}>
      {imagePath ? (
        <div onClick={handleImageClick} className={`${styles['imageContent']}`}>
          {/* <div onClick={handleImageClick} className={`${styles['imageContent']} ${styles[imageStyle]} ${styles[imageCategory]} ${styles[imagePlace]}`}> */}

          <Image
            src={imagePath}
            alt="image"
            layout="fill"
            objectFit="cover"
            sizes="(max-width: 600px) 100vw, 600px" //これないと、表示ﾌｫｰﾑのサイズによっては画像が表示されない
          />
          {showDeleteButton && (
            <button
              onClick={handleDeleteClick}
              className={styles['delete-button']}>
              +
            </button>
          )}
        </div>
      ) : (
        <>
          <input
            type="file"
            id="file-input"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            ref={fileInputRef}
          />
          <button
            onClick={handleImageClick}
            // className={`${styles['editImage']} ${styles[imageStyle]} ${styles[imageCategory]}`}
            className={`${styles['editImage']}`}>
            +
          </button>
        </>
      )}
    </div>
  )
}
