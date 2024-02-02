'use client'
import React, { useState } from 'react'
import Link from 'next/link'

import ReactModal from 'react-modal'
import modalStyles from '@/components/tutorialModal/Modal.module.css'

// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//   },
// }

// body にマウント
ReactModal.setAppElement('body')

export default function Modal({ isOpen, prev, next, board_id, children }) {
  let subtitle
  const [modalIsOpen, setIsOpen] = useState(isOpen)

  function openModal() {
    setIsOpen(true)
  }

  function afterOpenModal() {
    if (subtitle) subtitle.style.color = '#f00'
  }

  function closeModal() {
    setIsOpen(false)
  }
  console.log(next)
  console.log(board_id)
  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <ReactModal
        contentLabel="Example Modal"
        isOpen={modalIsOpen}
        className={modalStyles.Modal}
        overlayClassName={modalStyles.Overlay}
        // className={modalStyles.customContent} // モーダル内部のスタイル
        // overlayClassName={modalStyles.customOverlay} // オーバーレイのスタイル
        onAfterOpen={afterOpenModal}
        shouldCloseOnOverlayClick={false}
        onRequestClose={closeModal}>
        {children}
        <div className={modalStyles.changeStep}>
          {prev && (
            <div className={`${modalStyles.link} ${modalStyles.left}`}>
              <Link
                href={`/tutorial/step${prev}?board_id=${board_id}`}
                className={modalStyles.link}>{`◀ ステップ${prev}`}</Link>
            </div>
          )}
          {next === 'last' ? (
            <Link
              href={`/edit?board_id=${board_id}`}
              className={`${modalStyles.link} ${modalStyles.right}`}>
              スタート！
            </Link>
          ) : (
            <div className={`${modalStyles.link} ${modalStyles.right}`}>
              <Link
                href={`/tutorial/step${next}?board_id=${board_id}`}>{`ステップ${next} ▶`}</Link>
            </div>
          )}
        </div>
      </ReactModal>
    </div>
  )
}
