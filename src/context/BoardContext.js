import { useState, createContext, useEffect } from 'react'
import axios from '@/lib/axios'

export const BoardState = createContext()

export const BoardProvider = ({ tmp, board_id, children }) => {
  // 仮に user1 とする
  const user = 1
  const [board, setBoard] = useState({
    user_id: user,
    tmp_id: tmp,
    board_id: board_id,
    textBoxes: ['', '', '', '', '', ''],
    html_text: '',
  })

  // useEffect(() => {
  //   const request = {
  //     user_id: user,
  //   }

  //   const createBoard = async () => {
  //     try {
  //       console.log(request)
  //       const boardId = await axios.post('api/vision_boards/', request)
  //       console.log(boardId.data)
  //       console.log({
  //         ...board,
  //         board_id: boardId.data,
  //       })
  //       setBoard(prevBoard => ({
  //         ...prevBoard,
  //         board_id: boardId.data,
  //       }))
  //       console.log(board)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   createBoard()
  // }, [])

  return (
    <BoardState.Provider value={[board, setBoard]}>
      {children}
    </BoardState.Provider>
  )
}
