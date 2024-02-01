'use client'
import { useCallback, useState, useRef, useEffect, useContext } from 'react'
import styles from '@/components/create/TextBox.module.css'
import { BoardState } from '@/context/BoardContext'

export default function TextBox({ storeHtml, thisArea }) {
  const [, , textBoxes, setTextBoxes] = useContext(BoardState)
  // 再レンダリングされても消えないように useRef で texTimer を保持
  const texTimer = useRef(null)

  // useCallback で再レンダリングされる度に実行されないようにする
  const handleTextChange = useCallback(e => {
    // テキストを state に保存
    console.log(thisArea)
    const newTexts = textBoxes
    newTexts[thisArea] = e.target.value
    setTextBoxes(newTexts)

    // タイマーと html 保存の処理
    storeHtml()
  }, [])

  return (
    <div
      data-text={
        (thisArea === 'lifeStyle' && textBoxes.lifeStyle) ||
        (thisArea === 'work' ? textBoxes.work : null) ||
        (thisArea === 'name_year' ? textBoxes.name_year : null) ||
        (thisArea === 'will' ? textBoxes.will : null) ||
        (thisArea === 'fun' ? textBoxes.fun : null) ||
        (thisArea === 'health' ? textBoxes.health : null)
      }>
      <textarea
        className={styles.text_box}
        maxlength="104"
        // value={
        //   (thisArea === 'lifeStyle' && textBoxes.lifeStyle) ||
        //   (thisArea === 'work' ? textBoxes.work : null) ||
        //   (thisArea === 'name_year' ? textBoxes.name_year : null) ||
        //   (thisArea === 'will' ? textBoxes.will : null) ||
        //   (thisArea === 'fun' ? textBoxes.fun : null) ||
        //   (thisArea === 'health' ? textBoxes.health : null)
        // }
        onChange={handleTextChange}></textarea>
    </div>
  )
}
