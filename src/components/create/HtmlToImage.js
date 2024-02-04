'use client'

// import { useEffect, useState } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
// import Template from './Template';
// import html2canvas from 'html2canvas';
// import axios from '@/lib/axios';


// export default function HtmlToImage() {
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [thumbnail, setThumbnail] = useState(null); // サムネイル用のステートを追加
//   const searchParams = useSearchParams();
//   const board_id = searchParams.get('board_id');

//   // 画像をキャプチャしてサムネイルを作成する関数
//   const captureAndCreateThumbnail = async () => {
//     try {
//       const captureElement = document.getElementById('capture');
//       const canvas = await html2canvas(captureElement);
//       const captureDataUrl = canvas.toDataURL("image/png");

//       // サムネイルを作成
//       setThumbnail(captureDataUrl);

//       // 画像を保存するAPIエンドポイントにキャプチャされた画像を送信
//       const response = await axios.patch(`http://127.0.0.1:8000/api/vision_boards/capture/${board_id}`, { image: captureDataUrl })

//       // 保存された画像のURLを状態として設定
//       setCapturedImage(captureDataUrl);
//     } catch (error) {
//       console.error('Failed to capture image:', error);
//     }
//   };

//   // サムネイルを作成
//   useEffect(() => {
//     if (capturedImage === null) {
//       captureAndCreateThumbnail();
//     }
//   }, []);

//   // ボタンをクリックしたときにサムネイルを更新
//   const handleButtonClick = () => {
//     captureAndCreateThumbnail();
//   };

//   return (
//     <div id='capture'>
//       <Template />
//       {/* サムネイルを表示 */}
//     </div>
//   );
// }

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
