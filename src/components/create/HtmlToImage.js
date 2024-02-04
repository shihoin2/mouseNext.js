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
import html2canvas from 'html2canvas';
import axios from '@/lib/axios';
import Template from '@/components/create/Template';

export default function HtmlToImage() {
  const [capturedImage, setCapturedImage] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [preventNavigation, setPreventNavigation] = useState(false);
  const searchParams = useSearchParams();
  const board_id = searchParams.get('board_id');

  useEffect(() => {
    // コンポーネントがマウントされたことを示すフラグを設定
    setIsMounted(true);

    const captureImage = async () => {
      try {
        const captureElement = document.getElementById('capture');
        const canvas = await html2canvas(captureElement);
        const captureDataUrl = canvas.toDataURL("image/png");

        // 画像を保存するAPIエンドポイントにキャプチャされた画像を送信
        const response = await axios.patch(`http://127.0.0.1:8000/api/vision_boards/capture/${board_id}`, { image: captureDataUrl });
        setCapturedImage(captureDataUrl);

        // 画像がキャプチャされた後、画面遷移を許可
        setPreventNavigation(false);
      } catch (error) {
        console.error('Failed to capture image:', error);
      }
    };

    // ページ遷移時に画像をキャプチャ
    if (!preventNavigation) {
      captureImage();

      // beforeunloadイベントリスナーを設定して、ページがアンロードされる前に画像を再度キャプチャ
      window.addEventListener("beforeunload", captureImage);
    }

    return () => {
      // コンポーネントがアンマウントされる際にイベントリスナーをクリーンアップ
      window.removeEventListener("beforeunload", captureImage);
    };
  }, [preventNavigation]);

  // マウントタイミングを確認
  useEffect(() => {
    console.log('Component is mounted');
    return () => {
      console.log('Component is unmounted');
    };
  }, []);

  // 画像がキャプチャされるまで、画面遷移をキャンセルし、キャプチャをトリガー
  const handleLinkClick = async (event) => {
    if (!capturedImage) {
      event.preventDefault();
      setPreventNavigation(true);
      await captureImage(); // ページ遷移をキャプチャ
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
