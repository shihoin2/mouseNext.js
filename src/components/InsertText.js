'use client'
import { useCallback, useState, useRef, useEffect } from 'react'
import styles from './InsertText.module.css'

export default function InsertText() {
  const [text, setText] = useState('')

  // 再レンダリングされても消えないように useRef でタイマーを保持
  const timer = useRef(null)

  // useCallback で再レンダリングされる度に実行されないようにする
  const handleTextChange = useCallback(e => {
    setText(e.target.value)

    // timer にまだタイマーがセットされていたら(5秒未経過)、そのタイマーは削除する
    if (timer.current) {
      clearTimeout(timer.current)
    }

    // timer に新しいタイマーをセット
    // また5秒からスタートなので、データ保存が延期されることになる
    timer.current = setTimeout(() => {
      // データ保存の処理
      console.log('何かしらデータを保存する処理')
      // 5 秒後に↑の処理を実行
    }, 5000)
  }, [])

  // ページを離れる前に保存処理を実行
  const handleBeforeUnload = () => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
    saveToDatabase()
  }

  // イベントリスナーを設定
  useEffect(() => {
    // 画面遷移する前にイベントが発火する
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      // ↑のイベントにより関数が実行されたら、イベントリスナーを削除する
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [handleBeforeUnload])

  return (
    <>
      <textarea
        className={styles.text_box}
        maxlength="104"
        onChange={handleTextChange}></textarea>
    </>
  )
}
