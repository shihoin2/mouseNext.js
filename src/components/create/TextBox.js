'use client'
import { useCallback, useState, useRef, useEffect, useContext } from 'react'
import styles from '@/components/create/TextBox.module.css'
import { BoardState } from '@/context/BoardContext'

export default function TextBox({ id, storeHtml }) {
  const [board, setBoard] = useContext(BoardState)
  // 再レンダリングされても消えないように useRef で texTimer を保持
  const texTimer = useRef(null)

  // useCallback で再レンダリングされる度に実行されないようにする
  const handleTextChange = useCallback(e => {
    // テキストを state に保存
    const newTextBoxes = board.textBoxes
    newTextBoxes[id] = e.target.value
    setBoard({ ...board, textBoxes: newTextBoxes })

    // タイマーと html 保存の処理
    storeHtml()
  }, [])

  return (
    <>
      <textarea
        className={styles.text_box}
        maxlength="104"
        value={board.textBoxes[id]}
        onChange={handleTextChange}></textarea>
    </>
  )
}
