'use client'
import { useEffect } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import Template from './Template';
import html2canvas from 'html2canvas';
import axios from '@/lib/axios';

export default function HtmlToImage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const board_id = searchParams.get('board_id');

  async function requestCapture() {
    try {
        const response = await axios.post('/api/capture', { captureElement: 'capture' });
        const imageData = response.data.imageData;
        console.log(imageData);
        // 取得した画像データを適切に処理する（表示、保存など）
    } catch (error) {
        console.error('Failed to capture image:', error);
    }
}

useEffect(() => {

  requestCapture();
}, []);

  const captureImage = async () => {
    try {
      const captureElement = document.getElementById('capture');
      console.log(captureElement);//Htmlが入っている
      const canvas = await html2canvas(captureElement);
      console.log(canvas);
      const captureDataUrl = canvas.toDataURL("image/png");
      console.log(captureDataUrl);

      const response = await axios.patch(`/api/vision_boards/capture/${board_id}`, { image: captureDataUrl });
      console.log(response.data);
    } catch (error) {
      console.error('Failed to capture image:', error);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = async () => {
      await captureImage();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const captureAndUpdateImage = async () => {
      await captureImage();
    };
    const url = `${pathname}?${searchParams}`;
    captureImage();
    window.addEventListener("beforeunload", captureAndUpdateImage);

    return () => {
      window.removeEventListener("beforeunload", captureAndUpdateImage);
    };
  }, [pathname, searchParams]);

  // useEffect(() => {
  //   const url = `${pathname}?${searchParams}`;
  //   captureImage();
  //   window.addEventListener("beforeunload", captureImage);

  //   return () => {
  //     window.removeEventListener("beforeunload", captureImage);
  //   };
  // }, [pathname, searchParams]);

  return (
    <div id='capture'>
      <Template />
    </div>
  );
}
