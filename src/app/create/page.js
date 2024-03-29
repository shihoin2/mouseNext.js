'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import axios from '@/lib/axios'
import { useRouter } from 'next/navigation'

export default function Page() {
  const board = useRef({
    user_id: '',
    tmp_id: '',
    board_id: '',
  })
  const router = useRouter()
  const query = useSearchParams()

  useEffect(() => {
    const user = 1
    board.current = { ...board, user_id: user, tmp_id: query.get('tmp') }

    const request = {
      user_id: user,
    }
    console.log(request)

    const createBoard = async () => {
      try {
        const response = await axios.post('api/vision_boards/', request)
        console.log(response)
        router.push(
          `/tutorial/step1?board_id=${response.data.board_id}&tmp=${board.current.tmp_id}`,
        )
      } catch (err) {
        console.log(err)
      }
    }
    createBoard()
  }, [])
}
