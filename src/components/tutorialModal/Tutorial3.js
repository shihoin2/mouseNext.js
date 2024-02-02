import Image from 'next/image'
import Modal from '@/components/tutorialModal/Modal'
import styles from '@/components/tutorialModal/Tutorial.module.css'

export default function Tutorial2({ board_id, step }) {
  console.log(board_id)
  return (
    <Modal isOpen={true} step={step} prev={2} next="last" board_id={board_id}>
      <section className={styles.container}>
        {/* <h2>ステップ3</h2> */}
        <Image
          src="/bubble.png"
          width={200}
          height={100}
          alt="tutorial"
          priority
          className={`${styles.bubble} ${styles.bubble2}`}
        />
      </section>
    </Modal>
  )
}
