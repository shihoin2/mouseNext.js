'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import axios from '@/lib/axios'
// import { ThemeProvider } from './context/ThemeContext'
import { useRouter } from 'next/navigation'
import ToolBar from '@/components/ToolBar'

export default function Page() {
  const board = useRef({
    user_id: '',
    tmp_id: '',
    board_id: '',
  })
  const router = useRouter()
  const query = useSearchParams()
  const tmp = query.get('tmp')

  useEffect(() => {
    const user = 1
    board.current = { ...board, user_id: user, tmp_id: query.get('tmp') }

    const request = {
      user_id: user,
    }

    const createBoard = async () => {
      try {
        const response = await axios.post('api/vision_boards/', request)
        // board.current = { ...board, board_id: boardId }
        // console.log(board.current)
        router.push(
          `/edit?board_id=${response.data.board_id}&tmp=${board.current.tmp_id}`,
        )
      } catch (err) {
        console.log(err)
      }
    }
    createBoard()
  }, [])

  // return (
  //   <ThemeProvider>
  //     <Header link={'/'} text={'Preview'} />
  // <ToolBar />
  //     <ToolBar / className="create">
  //     <main className="create">
  //       <Template />
  //     </main>
  //   </ThemeProvider>
  // )
}
