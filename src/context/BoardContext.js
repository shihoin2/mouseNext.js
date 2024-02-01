import { useState, createContext, useEffect } from 'react'
import axios from '@/lib/axios'

export const BoardState = createContext()

export const BoardProvider = ({ tmp, board_id, data, children }) => {
  // 仮に user1 とする
  const user = 1

  // 共通で管理するデータ
  const [board, setBoard] = useState({
    user_id: user,
    tmp_id: tmp,
    board_id: board_id,
    html_text: '',
  })

  // 共通で管理するデータ
  const [textBoxes, setTextBoxes] = useState({
    lifeStyle: '',
    work: '',
    name_year: '',
    will: '',
    fun: '',
    health: '',
  })

  useEffect(() => {
    if (data) {
      console.log(data.textBoxes)

      setBoard({
        user_id: user,
        tmp_id: tmp,
        board_id: board_id,
        html_text: data.edited_html,
      })

      setTextBoxes({
        lifeStyle: data.textBoxes.lifeStyle,
        work: data.textBoxes.work,
        name_year: data.textBoxes.name_year,
        will: data.textBoxes.will,
        fun: data.textBoxes.fun,
        health: data.textBoxes.health,
      })
    }
  }, [data])

  // console.log(data[edited_html])
  // console.log(data.textBoxes.lifeStyle)

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
    <BoardState.Provider value={[board, setBoard, textBoxes, setTextBoxes]}>
      {children}
    </BoardState.Provider>
  )
}
