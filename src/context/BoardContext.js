'use client'
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
      console.log({
        ...data,
        user_id: user,
        tmp_id: tmp,
        board_id: board_id,
        html_text: data.edited_html,
      })
      setBoard(prev => {
        return {
          ...prev,
          user_id: user,
          tmp_id: tmp,
          board_id: board_id,
          html_text: data.edited_html,
        }
      })

      // setTextBoxes(prev => {
      //   return {
      //     ...prev,
      //     lifeStyle: data.textBoxes.lifeStyle,
      //     work: data.textBoxes.work,
      //     name_year: data.textBoxes.name_year,
      //     will: data.textBoxes.will,
      //     fun: data.textBoxes.fun,
      //     health: data.textBoxes.health,
      //   }
      // })
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

  useEffect(() => {
    console.log(board)
    console.log(textBoxes)
  }, [textBoxes])

  return (
    <BoardState.Provider value={[board, setBoard, textBoxes, setTextBoxes]}>
      {children}
    </BoardState.Provider>
  )
}
