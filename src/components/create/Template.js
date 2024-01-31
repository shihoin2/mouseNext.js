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
import { encycle, decycle } from 'json-cyclic'
import parse from 'html-react-parser'

// export const Timer = createContext()

export default function Template() {
  const htmlRef = useRef()
  // console.log(htmlRef)
  const [board, setBoard] = useContext(BoardState)
  // const [boardId, setBoardId] = useState()

  // useEffect(() => {
  //   const request = {
  //     user_id: board.user_id,
  //   }

  //   const createBoard = async () => {
  //     try {
  //       console.log(request)
  //       const response = await axios.post('api/vision_boards/', request)
  //       console.log(response.data)

  //       // console.log({
  //       //   ...board,
  //       //   board_id: response.data,
  //       // })
  //       setBoardId(response.data)

  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   createBoard()
  // }, [])

  // useEffect(() => {
  //   if (boardId) {
  //     setBoard({
  //       ...board,
  //       board_id: boardId,
  //     })
  //     console.log(board)
  //   }
  // }, [boardId])

  // 再レンダリングされても消えないように useRef でタイマーを保持
  const timer = useRef(null)

  const storeHtml = useCallback(() => {
    console.log(board)
    console.log('storeHtml called')
    // timer にまだタイマーがセットされていたら(5秒未経過)、そのタイマーは削除する
    if (timer.current) {
      clearTimeout(timer.current)
    }

    const requestUpdateHtml = async () => {
      try {
        console.log(board.board_id)
        const request = {
          edited_html: htmlRef.current.innerHTML,
        }

        const response = await axios.put(
          `api/vision_boards/${board.board_id}`,
          request,
        )
        console.log(response.data[0])
        setBoard({ ...board, html_text: response.data[0] })
        console.log(board.html_text)
      } catch (err) {
        console.log(err)
      }
    }

    // timer に新しいタイマーをセット
    // また5秒からスタートなので、データ保存が延期されることになる
    timer.current = setTimeout(() => {
      // データ保存の処理
      console.log('html を保存する処理')
      // const request = {
      //   edited_html: htmlRef.current.innerHTML,
      // }
      // console.log(request)

      requestUpdateHtml()
      // 5 秒後に↑の処理を実行
    }, 5000)
  }, [])

  // ページを離れる前にも保存処理を実行
  const handleBeforeUnload = () => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
    saveToDatabase()
  }

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
    <section className={styles.template} ref={htmlRef}>
      {board.html_text ? (
        parse(board.html_text)
      ) : (
        <>
          <div className={styles.row}>
            <TextBox id="1" storeHtml={storeHtml} />
            <div className={styles.image}>{board.html_text}</div>
            <div className={styles.image}></div>
            <TextBox id="2" storeHtml={storeHtml} />
            <div className={styles.image}></div>
          </div>
          <div className={styles.row}>
            <div className={styles.image}></div>
            <div className={styles.image}></div>
            <div className={styles.image}></div>
            <TextBox id="0" yearNameBox={true} storeHtml={storeHtml} />
            <div className={styles.image}></div>
            <TextBox id="3" storeHtml={storeHtml} />
          </div>
          <div className={styles.row}>
            <TextBox id="4" storeHtml={storeHtml} />
            <div className={styles.image}></div>
            <TextBox id="5" storeHtml={storeHtml} />
            <div className={styles.image}></div>
            <div className={styles.image}></div>
          </div>
        </>
      )}
    </section>
  )
}
