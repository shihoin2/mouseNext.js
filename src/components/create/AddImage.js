'use client'
import { useState, useRef } from 'react';
import axios from '@/lib/axios';
import Image from 'next/image';
import styles from './AddImage.module.css';

export default function AddImage({imageStyle, imageCategory}) {
  const [imagePath, setImagePath] = useState(null);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await uploadImage(file);
    }
  }

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/vision/1`, formData);
      if (response.data && response.data.image_url) {
        setImagePath(response.data.image_url);
        setShowDeleteButton(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleDeleteClick = () => {
    setImagePath(null);
    setShowDeleteButton(false);
  }

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  return (
    <div className={`${styles['imageContent']} ${styles[imageStyle]} ${styles[imageCategory]}`}
      onMouseEnter={() => setShowDeleteButton(true)}
      onMouseLeave={() => setShowDeleteButton(false)}
    >
      {imagePath ? (
           <div onClick={handleImageClick} className={`${styles['imageContent']} ${styles[imageStyle]} ${styles[imageCategory]}`}>
            <Image
              src={imagePath}
              alt="image"
              layout="fill"
              objectFit="cover"
              sizes="(max-width: 600px) 100vw, 600px"//これないと、表示ﾌｫｰﾑのサイズによっては画像が表示されない
            />
          {/* </div> */}
          {showDeleteButton && (
            <button
              onClick={handleDeleteClick}
              className={styles['delete-button']}
            >+</button>
          )}
        </div>
      ) : (
        <>
          <input
            type='file'
            id='file-input'
            onChange={handleFileChange}
            style={{ display: 'none' }}
            ref={fileInputRef}
          />
          <button
            onClick={handleImageClick}
            // className={`${styles['editImage']} ${styles[imageStyle]} ${styles[imageCategory]}`}
            className={`${styles['editImage']}`}
          >+</button>
        </>
      )}
    </div>
  );
}
