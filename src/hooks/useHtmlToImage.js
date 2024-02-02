import { useEffect } from 'react';
import html2canvas from 'html2canvas';
import axios from '@/lib/axios';

export default function useHtmlToImage() {
  const captureImage = async () => {
    try {
      const captureElement = document.getElementById('capture');
      const canvas = await html2canvas(captureElement, );
      // const canvas = await html2canvas(captureElement, {
      //   width : 1280,
      //   height : 720,
      // });
      const captureDataUrl = canvas.toDataURL("image/png");
      console.log(captureDataUrl);

      const response = await axios.patch(`http://127.0.0.1:8000/api/vision/capture/1`, { image: captureDataUrl })
      console.log(response.data);
    } catch (error) {
      console.error('Failed to capture image:', error);
    }
  }

  useEffect(() => {
    const handleBeforeUnload = () => {
      captureImage();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [captureImage]);

  return { captureImage };
}
