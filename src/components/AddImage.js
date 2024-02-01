'use client'
import { useState, useRef } from 'react';
import axios from '@/lib/axios';
import Image from 'next/image';

export default function Page() {
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
    <div
      style={{ position: 'relative', width: '200px', height: '200px', border: '1px solid #000', overflow: 'hidden' }}
      onMouseEnter={() => setShowDeleteButton(true)}
      onMouseLeave={() => setShowDeleteButton(false)}
    >
      {imagePath ? (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <div onClick={handleImageClick} style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image
              src={imagePath}
              alt="image"
              layout="fill"
              objectFit="cover"
            />
          </div>
          {showDeleteButton && (
            <button
              onClick={handleDeleteClick}
              style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '16px',
              }}
              className="delete-button"
            >×</button>
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
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              cursor: 'pointer',
              backgroundColor: 'transparent',
              border: 'none',
            }}
          >+</button>
        </>
      )}
    </div>
  );
}
