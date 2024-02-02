'use client'
import {
  useContext,
  useRef,
  useEffect,
  useCallback,
  createContext,
  useState,
} from 'react'
import axios from '@/lib/axios'
import TextBox from '@/components/create/TextBox'
import { BoardState } from '@/context/BoardContext'
import styles from './Template.module.css'

// import { encycle, decycle } from 'json-cyclic'
// import parse from 'html-react-parser'

// export const Timer = createContext()

export default function Template() {
  const htmlRef = useRef()
  // console.log(htmlRef)
  const [board, setBoard, textBoxes] = useContext(BoardState)

  // 再レンダリングされても消えないように useRef でタイマーを保持
  const timer = useRef(null)

  // useEffect(()=>{

  // })
  const storeHtml = () => {
    console.log(board)
    // timer にまだタイマーがセットされていたら(5秒未経過)、そのタイマーは削除する
    if (timer.current) {
      clearTimeout(timer.current)
    }

    const requestUpdate = async () => {
      try {
        console.log(textBoxes)

        const request = {
          edited_html: htmlRef.current.innerHTML,
          textBoxes: textBoxes,
        }
        console.log(request)
        console.log(htmlRef.current.innerHTML)

        const response = await axios.put(
          `api/vision_boards/${board.board_id}`,
          request,
        )
        console.log(response)

        setBoard({ ...board, html_text: response.data.edited_html })
      } catch (err) {
        console.log(err)
      }
    }

    // timer に新しいタイマーをセット
    // また5秒からスタートなので、データ保存が延期されることになる
    timer.current = setTimeout(() => {
      // データ保存の処理
      console.log('html, text を保存する処理')

      requestUpdate()
      // 5 秒後に↑の処理を実行
    }, 5000)
  }

  // ページを離れる前にも保存処理を実行
  const handleBeforeUnload = () => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
    storeHtml()
  }

  // useEffect(() => {
  //   console.log('Template:textBoxes更新！')
  //   console.log(textBoxes)
  // }, [textBoxes])

  // イベントリスナー
  useEffect(() => {
    // 画面遷移する前にイベントが発火する
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      // ↑のイベントにより↓の関数が実行されたら、イベントリスナーを削除する
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [handleBeforeUnload])

  return (
    <section id="modal_target" className={styles.template} ref={htmlRef}>
      <>
        <div className={styles.row}>
          <TextBox storeHtml={storeHtml} thisArea={'lifeStyle'} />
          <div className={styles.image}></div>
          <div className={styles.image}></div>
          <TextBox storeHtml={storeHtml} thisArea={'work'} />
          <div className={styles.image}></div>
        </div>
        <div className={styles.row}>
          <div className={styles.image}></div>
          <div className={styles.image}></div>
          <div className={styles.image}></div>
          <TextBox
            yearNameBox={true}
            storeHtml={storeHtml}
            thisArea={'name_year'}
          />
          <div className={styles.image}></div>
          <TextBox storeHtml={storeHtml} thisArea={'will'} />
        </div>
        <div className={styles.row}>
          <TextBox storeHtml={storeHtml} thisArea={'fun'} />
          <div className={styles.image}></div>
          <TextBox storeHtml={storeHtml} thisArea={'health'} />
          <div className={styles.image}></div>
          <div className={styles.image}></div>
        </div>
      </>
    </section>
  )
}
