'use client'
import { useCallback, useState, useRef, useEffect, useContext } from 'react'
import styles from '@/components/create/TextBox.module.css'
import { BoardState } from '@/context/BoardContext'

export default function TextBox({ storeHtml, thisArea, textCategory }) {
  const [, , textBoxes, setTextBoxes] = useContext(BoardState)
  // 再レンダリングされても消えないように useRef で texTimer を保持
  const texTimer = useRef(null)

  // useCallback で再レンダリングされる度に実行されないようにする
  const handleTextChange = useCallback(
    e => {
      // テキストを state に保存
      console.log(thisArea)
      setTextBoxes(prevTextBoxes => {
        console.log({
          ...prevTextBoxes,
          [thisArea]: e.target.value,
        })

        return {
          ...prevTextBoxes,
          [thisArea]: e.target.value,
        }
      })

      // タイマーと html 保存の処理
      storeHtml()
    },
    [thisArea, setTextBoxes, storeHtml],
  )

  console.log(textBoxes.work)

  return (
    <textarea
      // className={styles.text_box}
      className={`${styles['text_box']} ${styles[textCategory]}`}
      maxlength="104"
      // value={
      //   (thisArea === 'lifeStyle' ? textBoxes.lifeStyle : null) ||
      //   (thisArea === 'work' ? textBoxes.work : null) ||
      //   (thisArea === 'name_year' ? textBoxes.name_year : null) ||
      //   (thisArea === 'will' ? textBoxes.will : null) ||
      //   (thisArea === 'fun' ? textBoxes.fun : null) ||
      //   (thisArea === 'health' ? textBoxes.health : null)
      // }
      value={textBoxes[thisArea]}
      onChange={handleTextChange}></textarea>
  )
}
