'use client'
import { useState, useRef, useEffect } from 'react';
import axios from '@/lib/axios';
import Image from 'next/image';
import styles from './AddImage.module.css';
import { useSearchParams, usePathname } from 'next/navigation';

export default function AddImage({ imageStyle, imageCategory, imagePlace }) {
  const [imagePath, setImagePath] = useState(null);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const fileInputRef = useRef(null);
  const searchParams = useSearchParams();
  const board_id = searchParams.get('board_id');

  useEffect(() => {
    // ボードIDが存在する場合は、既存の画像を取得して表示する
    if (board_id) {
      fetchExistingImage(board_id);
    }
  }, [board_id]);

  const fetchExistingImage = async (boardId) => {
    try {
      const response = await axios.get(`/api/vision_boards/${boardId}/image`);
      if (response.data && response.data.image_url) {
        setImagePath(response.data.image_url);
        setShowDeleteButton(true);
      }
    } catch (error) {
      console.error('Error fetching existing image:', error);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await uploadImage(file);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await axios.post(`/api/vision_boards/${board_id}`, formData);
      if (response.data && response.data.image_url) {
        setImagePath(response.data.image_url);
        setShowDeleteButton(true);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleDeleteClick = () => {
    setImagePath(null);
    setShowDeleteButton(false);
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className={`${styles['imageContent']} ${styles[imageStyle]} ${styles[imageCategory]}`}
      onMouseEnter={() => setShowDeleteButton(true)}
      onMouseLeave={() => setShowDeleteButton(false)}
    >
      {imagePath ? (
        <div onClick={handleImageClick} className={`${styles['imageContent']}`}>
          <Image
            src={imagePath}
            alt="image"
            layout="fill"
            objectFit="cover"
            sizes="(max-width: 600px) 100vw, 600px"
          />
          {showDeleteButton && (
            <button onClick={handleDeleteClick} className={styles['delete-button']}>
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
          <button onClick={handleImageClick} className={`${styles['editImage']}`}>
            +
          </button>
        </>
      )}
    </div>
  );
}
