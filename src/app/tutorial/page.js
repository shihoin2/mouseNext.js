'use client'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import axios from '@/lib/axios'
import Edit from '@/app/edit/Edit'

export default function Page() {
  const query = useSearchParams()
  const board_id = query.get('board_id')
  const [data, setData] = useState()

  useEffect(() => {
    const getBoard = async () => {
      try {
        console.log(board_id)
        const response = await axios.get(`api/vision_boards/${board_id}`)
        console.log(response.data)
        console.log(response.data.textBoxes)
        setData({
          ...data,
          textBoxes: response.data.textBoxes,
          edited_html: response.data.edited_html,
        })
      } catch (err) {
        console.log(err)
      }
    }
    getBoard()
  }, [])

  return <Edit tutorial={true} step={2} />
}
