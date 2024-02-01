'use client'
import Header from '@/components/Header'
import ToolBar from '@/components/create/ToolBar'
import Template from '@/components/create/Template'
import { BoardProvider } from '@/context/BoardContext'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from '@/lib/axios'

export default function Page() {
  const query = useSearchParams()
  const board_id = query.get('board_id')
  const tmp = query.get('tmp')
  const [data, setData] = useState()

  useEffect(() => {
    const getBoard = async () => {
      try {
        console.log(board_id)
        const response = await axios.get(`api/vision_boards/${board_id}`)
        console.log(response.data)
        console.log(response.data.textBoxes)
        setData({
          textBoxes: response.data.textBoxes,
          edited_html: response.data.edited_html,
        })
      } catch (err) {
        console.log(err)
      }
    }
    getBoard()
  }, [])

  return (
    <BoardProvider tmp={tmp} board_id={board_id} data={data}>
      <Header link={'/'} text={'Preview'} />
      <ToolBar />
      <main className="create">
        <Template />
      </main>
    </BoardProvider>
  )
}
