'use client'
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import domtoimage from 'dom-to-image';
import axios from '@/lib/axios';
import Template from '@/components/create/Template';
// import puppeteer from 'puppeteer'

export default function HtmlToImage() {
  const [capturedImage, setCapturedImage] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [preventNavigation, setPreventNavigation] = useState(false);
  const searchParams = useSearchParams();
  const board_id = searchParams.get('board_id');



  useEffect(() => {
    setIsMounted(true);

    const captureImage = async () => {
      try {
        const captureElement = document.getElementById('capture');
        console.log(captureElement);

        // dom-to-imageを使用してHTML要素をキャプチャし、データURLを取得
        domtoimage.toPng(captureElement)
          .then(function (dataUrl) {
            // 画像を保存するAPIエンドポイントにキャプチャされた画像を送信
            axios.patch(`http://127.0.0.1:8000/api/vision_boards/capture/${board_id}`, { image: dataUrl })
              .then(response => {
                setCapturedImage(dataUrl);
                setPreventNavigation(false);
              })
              .catch(error => {
                console.error('Failed to save image:', error);
              });
          })
          .catch(function (error) {
            console.error('Failed to capture image:', error);
          });
      } catch (error) {
        console.error('Failed to capture image:', error);
      }
    };

    if (!preventNavigation) {
      // レンダリングが完了するまで待機する
      const timer = setTimeout(() => {
        captureImage();
        window.addEventListener("beforeunload", captureImage);
      }, 1000); // 1秒待機してからキャプチャを実行
      return () => clearTimeout(timer); // タイマーをクリーンアップ
    }
  }, [preventNavigation]);

  useEffect(() => {
    console.log('Component is mounted');
    return () => {
      console.log('Component is unmounted');
    };
  }, []);

  const handleLinkClick = async (event) => {
    if (!capturedImage) {
      event.preventDefault();
      setPreventNavigation(true);
      await captureImage();
    }
  };

  return (
    <div id='capture'>
      <Template />
      {/* {isMounted && capturedImage && (
        <img src={capturedImage} alt="Captured Image" />
      )}
      <a href="/next-page" onClick={handleLinkClick}>Next Page</a> */}
    </div>
  );
}
