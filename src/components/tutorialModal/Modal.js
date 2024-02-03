'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import { CgCloseO } from 'react-icons/cg'

import ReactModal from 'react-modal'
import modalStyles from '@/components/tutorialModal/Modal.module.css'

// body にマウント
ReactModal.setAppElement('body')

export default function Modal({
  isOpen,
  step,
  prev,
  next,
  board_id,
  children,
}) {
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
      <ReactModal
        contentLabel="Tutorial Modal"
        isOpen={modalIsOpen}
        className={`${modalStyles.Modal} ${modalStyles.step}`}
        overlayClassName={`${modalStyles.Overlay} ${
          modalStyles['step' + step]
        }`}
        onAfterOpen={afterOpenModal}
        shouldCloseOnOverlayClick={false}
        onRequestClose={closeModal}>
        {children}
        <div className={modalStyles.changeStep}>
          {prev && (
            <div className={`${modalStyles.link} ${modalStyles.left}`}>
              <IconContext.Provider value={{ color: '#bff0f6', size: '80px' }}>
                <Link href={`/tutorial/step${prev}?board_id=${board_id}`}>
                  <FaArrowCircleLeft />
                </Link>
              </IconContext.Provider>
            </div>
          )}
          {next === 'last' ? (
            <div className={`${modalStyles.link} ${modalStyles.right}`}>
              <IconContext.Provider value={{ color: '#bff0f6', size: '80px' }}>
                <Link href={`/edit?board_id=${board_id}`}>
                  <CgCloseO />
                </Link>
              </IconContext.Provider>
            </div>
          ) : (
            <div className={`${modalStyles.link} ${modalStyles.right}`}>
              <IconContext.Provider value={{ color: '#bff0f6', size: '80px' }}>
                <Link href={`/tutorial/step${next}?board_id=${board_id}`}>
                  <FaArrowCircleRight />
                </Link>
              </IconContext.Provider>
            </div>
          )}
        </div>
      </ReactModal>
    </div>
  )
}
