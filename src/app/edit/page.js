'use client'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import axios from '@/lib/axios'
import Edit from '@/app/edit/Edit'

export default function Page() {
  const query = useSearchParams()
  const board_id = query.get('board_id')
  const DataRef = useRef()
  const [data, setData] = useState()

  useEffect(() => {
    const getBoard = async () => {
      try {
        console.log(board_id)
        const response = await axios.get(`api/vision_boards/${board_id}`)
        console.log(response.data)
        console.log(response.data.textBoxes)
        console.log(response.data.edited_html)
        DataRef.current = {
          textBoxes: response.data.textBoxes,
          edited_html: response.data.edited_html,
        }
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

  useEffect(() => {
    console.log(DataRef.current)
    console.log(data)
  })

  return <Edit tutorial={false} step={false} data={data} />
}
