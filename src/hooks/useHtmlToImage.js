// import { useEffect } from 'react';
// import { useSearchParams, usePathname } from 'next/navigation';
// import html2canvas from 'html2canvas';
// import axios from '@/lib/axios';

// export default function useHtmlToImage() {
//   const searchParams = useSearchParams();
//   const board_id = searchParams.get('board_id')
//   const captureImage = async () => {
//     try {
//       const captureElement = document.getElementById('capture');
//       const canvas = await html2canvas(captureElement, );
//       // const canvas = await html2canvas(captureElement, {
//       //   width : 1280,
//       //   height : 720,
//       // });
//       const captureDataUrl = canvas.toDataURL("image/png");
//       // console.log(captureDataUrl);

//       const response = await axios.patch(`/api/vision_boards/capture/${board_id}`, { image: captureDataUrl })
//       // console.log(response.data);
//     } catch (error) {
//       console.error('Failed to capture image:', error);
//     }
//   }

//   useEffect(() => {
//     const handleBeforeUnload = () => {
//       captureImage();
//     };

//     window.addEventListener('beforeunload', handleBeforeUnload);

//     return () => {
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//     };
//   }, [captureImage]);

//   return { captureImage };
// }
