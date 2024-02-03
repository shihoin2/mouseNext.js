'use client'
import Image from 'next/image'
import styles from './Help.module.css'
import Header from '@/components/Header'
import { useEffect, useState } from 'react'
import Answer1 from './answer1'
import Answer2 from './answer2'
import Answer3 from './answer3'
import Answer4 from './answer4'

export default function Page({ boart_id }) {
  const [isOpen, setIsOpen] = useState({
    q1: true,
    q2: false,
    q3: false,
    q4: false,
  })

  useEffect(() => {
    console.log(isOpen)
  }, [isOpen])

  const toggleOpen = questionNum => {
    setIsOpen(prev => {
      return {
        ...{
          q1: false,
          q2: false,
          q3: false,
          q4: false,
        },
        [questionNum]: true,
      }
    })
  }

  return (
    <>
      <Header link={`/edit?boart_id${boart_id}`} text={'Back'} />
      <main className={styles.container}>
        <div className={styles.top}>
          <div className={styles.questions}>
            <ul>
              <li className={styles.list}>
                <button
                  onClick={() => {
                    toggleOpen('q1')
                  }}>
                  <h3 className={isOpen.q1 && styles.selected}>Q1 : Vision Board とはなんですか？</h3>
                </button>
              </li>
              <li className={styles.list}>
                <button
                  onClick={() => {
                    toggleOpen('q2')
                  }}>
                  <h3 className={isOpen.q2 && styles.selected}>Q2 : 各項目について詳しく知りたい</h3>
                </button>
              </li>
              <li className={styles.list}>
                <button
                  onClick={() => {
                    toggleOpen('q3')
                  }}>
                  <h3 className={isOpen.q3 && styles.selected}>Q3 : 目標の記入・保存方法について</h3>
                </button>
              </li>
              <li className={styles.list}>
                <button
                  onClick={() => {
                    toggleOpen('q4')
                  }}>
                  <h3 className={isOpen.q4 && styles.selected}>Q4 : 画像のアップロード方法を教えて！</h3>
                </button>
              </li>
            </ul>
          </div>
          <Image
            className={styles.thumbnail}
            src="/demo.png"
            width={700}
            height={50}
            priority></Image>
        </div>
        <div className={styles.bottom}>
          {(isOpen.q1 && <Answer1 />) ||
            (isOpen.q2 && <Answer2 />) ||
            (isOpen.q3 && <Answer3 />) ||
            (isOpen.q4 && <Answer4 />)}
        </div>
      </main>
    </>
  )
}
