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
import ToolBar from '@/components/create/ToolBar'
import TextBox from '@/components/create/TextBox'
import AddImage from '@/components/create/AddImage'
import AreaTitle from '@/components/create/AreaTitle'
import { BoardState } from '@/context/BoardContext'
import styles from './Template.module.css'
// import { encycle, decycle } from 'json-cyclic'
import parse from 'html-react-parser'

// export const Timer = createContext()

export default function Template() {
  const htmlRef = useRef()
  // console.log(htmlRef)
  const [board, setBoard, textBoxes, setTextBoxes] = useContext(BoardState)

  // 再レンダリングされても消えないように useRef でタイマーを保持
  const timer = useRef(null)

  const storeHtml = useCallback(() => {
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
      <div className={styles.board}>
        <div className={styles.row}>
          <TextBox storeHtml={storeHtml} thisArea={'lifeStyle'} textCategory={'life_style'} />
          <div className={styles.image}><AddImage imageStyle={'vertical'} imageCategory={'life_style1'}/></div>
          <div className={styles.image}><AddImage imageStyle={'boarder'} imageCategory={'work1'}/></div>
          <TextBox storeHtml={storeHtml} thisArea={'work'} textCategory={'work'} />
          <div className={styles.image}><AddImage imageStyle={'vertical'} imageCategory={'work2'}/></div>
        </div>
        <div className={styles.row}>
          <div className={styles.image}><AddImage imageStyle={'boarder'} imageCategory={'life_style2'}/></div>
          <div className={styles.image}><AddImage imageStyle={'boarder'} imageCategory={'fun1'}/></div>
          <div className={styles.image}><AddImage imageStyle={'vertical'} imageCategory={'fun2'}/></div>
          <TextBox
            yearNameBox={true}
            storeHtml={storeHtml}
            thisArea={'name_year'}
            textCategory={'name_year'}
          />
          <div className={styles.image}><AddImage imageStyle={'vertical'} imageCategory={'will1'}/></div>
          <TextBox storeHtml={storeHtml} thisArea={'will'} textCategory={'will' } />
        </div>
        <div className={styles.row}>
          <TextBox storeHtml={storeHtml} thisArea={'fun'} textCategory={'fun'} />
          <div className={styles.image}><AddImage imageStyle={'vertical'} imageCategory={'health1'}/></div>
          <TextBox storeHtml={storeHtml} thisArea={'health'} textCategory={'health'} />
          <div className={styles.image}><AddImage imageStyle={'boarder'} imageCategory={'health2'}/></div>
          <div className={styles.image}><AddImage imageStyle={'boarder'} imageCategory={'will2'}/></div>
        </div>
      </div>
    </section>
  )
}
