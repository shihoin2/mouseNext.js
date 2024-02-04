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
import HtmlToImage from './HtmlToImage';

export default function Template() {
  const htmlRef = useRef()
  const [board, setBoard, textBoxes] = useContext(BoardState)

  // 再レンダリングされても消えないように useRef でタイマーを保持
  const timer = useRef(null)

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
      <div className={styles.board}>
        <div className={styles.row}>

          <div className={styles.categoryTitle}>
            <AreaTitle areaTitle={'Life Style'} titleStyle={'Life-Style'} />
          </div>

          <div className={styles.categoryTitle}>
            <AreaTitle areaTitle={'Work'} titleStyle={'Work'} />
          </div>

          <TextBox
            storeHtml={storeHtml}
            thisArea={'lifeStyle'}
            textCategory={'life_style'}
          />

          <div className={styles.image}>
            <AddImage
              imagePlace={'life-image1'}
              imageStyle={'vertical'}
              imageCategory={'life_style1'}
            />
          </div>

          <div className={styles.image}>
            <AddImage
              imagePlace={'work-image1'}
              imageStyle={'boarder'}
              imageCategory={'work1'}
            />
          </div>

          <TextBox
            storeHtml={storeHtml}
            thisArea={'work'}
            textCategory={'work'}
          />

          <div className={styles.image}>
            <AddImage
              imagePlace={'work-image2'}
              imageStyle={'vertical'}
              imageCategory={'work2'}
            />
          </div>

        </div>

        <div className={styles.row}>
          <div className={styles.categoryTitle}>
            <AreaTitle areaTitle={'Fun'} titleStyle={'Fun'} />
          </div>
          <div className={styles.categoryTitle}>
            <AreaTitle areaTitle={'Will'} titleStyle={'Will'} />
          </div>
          <div className={styles.image}>
            <AddImage
              imagePlace={'life-image2'}
              imageStyle={'boarder'}
              imageCategory={'life_style2'}
            />
          </div>
          <div className={styles.image}>
            <AddImage
              imagePlace={'fun-image1'}
              imageStyle={'boarder'}
              imageCategory={'fun1'}
            />
          </div>
          <div className={styles.image}>
            <AddImage
              imagePlace={'fun-image2'}
              imageStyle={'vertical'}
              imageCategory={'fun2'}
            />
          </div>
          <TextBox
            yearNameBox={true}
            storeHtml={storeHtml}
            thisArea={'name_year'}
            textCategory={'name_year'}
          />
          <div className={styles.image}>
            <AddImage
              imagePlace={'will-image1'}
              imageStyle={'vertical'}
              imageCategory={'will1'}
            />
          </div>
          <TextBox
            storeHtml={storeHtml}
            thisArea={'will'}
            textCategory={'will'}
          />
        </div>
        <div className={styles.row}>
          <div className={styles.categoryTitle}>
            <AreaTitle areaTitle={'Health'} titleStyle={'Health'} />
          </div>
          <TextBox
            storeHtml={storeHtml}
            thisArea={'fun'}
            textCategory={'fun'}
          />
          <div className={styles.image}>
            <AddImage
              imagePlace={'health-image1'}
              imageStyle={'vertical'}
              imageCategory={'health1'}
            />
          </div>
          <TextBox
            storeHtml={storeHtml}
            thisArea={'health'}
            textCategory={'health'}
          />
          <div className={styles.image}>
            <AddImage
              imagePlace={'health-image2'}
              imageStyle={'boarder'}
              imageCategory={'health2'}
            />
          </div>
          <div className={styles.image}>
            <AddImage
              imagePlace={'will-image2'}
              imageStyle={'boarder'}
              imageCategory={'will2'}
            />
          </div>
        </div>

      </div>
    </section>
  );

}
