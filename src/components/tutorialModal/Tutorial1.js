import Modal from '@/components/tutorialModal/Modal'
import Image from 'next/image'
import styles from '@/components/tutorialModal/Tutorial.module.css'

export default function Tutorial1({ board_id, step }) {
  console.log(board_id)

  return (
    <Modal isOpen={true} step={step} prev={null} next={2} board_id={board_id}>
      <section className={styles.container}>
        <div className={`${styles.massageBox} ${styles.massageBox_step1}`}>
          <Image
            src="/bubble.png"
            width={200}
            height={100}
            alt="WEAVE"
            priority
            className={`${styles.bubble} ${styles.bubble_step1}`}
          />
          <div className={`${styles.message} ${styles.message_step1}`}>
            <p>
              まず中央に
              <br />
              あなたのお名前と
              <br />
              年を入力しましょう！
            </p>
          </div>
        </div>
      </section>
    </Modal>
  )
}
