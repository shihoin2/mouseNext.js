'use client'
import { seState, useRef, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import axios from '@/lib/axios'
import Image from 'next/image'
import html2canvas from 'html2canvas'
import Template from '@/components/create/Template'
// import useHtmlToImage from '@/hooks/useHtmlToImage'

export default function HtmlToImage({}) {
  // const pathname = usePathname()
  // const searchParams = useSearchParams()
  // const { captureImage } = useHtmlToImage()

  // useEffect(() => {
  //   captureImage();
  // }, [pathname, searchParams, captureImage]);

  // useEffect(() => {
  //   const url = `${pathname}?${searchParams}`
  //   captureImage()
  //   window.addEventListener('beforeunload', captureImage)
  //   return () => {
  //     window.removeEventListener('beforeunload', captureImage)
  //   }
  // }, [pathname, searchParams])

  return (
    <>
      <div id="capture">
        <Template />
        {/* {children} */}
      </div>
    </>
  )
}
