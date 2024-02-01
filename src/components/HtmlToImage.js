'use client'
import { seState, useRef, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams  } from 'next/navigation';
import axios from '@/lib/axios';
import Image from 'next/image';
import html2canvas from 'html2canvas';
import Header from '@/components/Header';
import Link from 'next/link';
import next from 'next';

export default function HtmlToImage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const captureImage = async () => {
    try {
      const captureElement = document.getElementById('capture');
      const canvas = await html2canvas(captureElement);
      const captureDataUrl = canvas.toDataURL("image/png");
      console.log(captureDataUrl);

      const response = await axios.patch(`http://127.0.0.1:8000/api/vision/capture/1`, { image: captureDataUrl })
      console.log(response.data);
    } catch (error) {
      console.error('Failed to capture image:', error);
    }
  }

  useEffect(() => {
    const url = `${pathname}?${searchParams}`
    captureImage();
      window.addEventListener("beforeunload", captureImage);
    return () => {
        window.removeEventListener("beforeunload", captureImage);
    };

  }, [pathname, searchParams]);

  return (
    <>
      <div id='capture'>
        <h2>Weave</h2>
        <p>Test</p>
      </div>
    </>
  );

}
