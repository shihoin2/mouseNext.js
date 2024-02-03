import Image from 'next/image'
import Modal from '@/components/tutorialModal/Modal'
import styles from '@/components/tutorialModal/Tutorial.module.css'

export default function Tutorial3({ board_id, step }) {
  console.log(board_id)
  return (
    <Modal isOpen={true} step={step} prev={2} next={4} board_id={board_id}>
      <section className={styles.container}>
        <div className={`${styles.massageBox} ${styles.massageBox_step3_1}`}>
          <Image
            src="/bubble.png"
            width={200}
            height={100}
            alt="WEAVE"
            priority
            className={`${styles.bubble} ${styles.bubble_step3_1}`}
          />
          <div className={`${styles.message} ${styles.message_step3_1}`}>
            <p>
              黄色のボックスには、
              <br />
              各項目に対する目標や想いを
              <br />
              記入しましょう！
            </p>
          </div>
        </div>
        <div className={`${styles.massageBox} ${styles.massageBox_step3_2}`}>
          <Image
            src="/bubble.png"
            width={200}
            height={100}
            alt="WEAVE"
            priority
            className={`${styles.bubble} ${styles.bubble_step3_2}`}
          />
          <div className={`${styles.message} ${styles.message_step3_2}`}>
            <p>
              入力した内容は
              <br />
              自動で保存されます
            </p>
          </div>
        </div>
      </section>
    </Modal>
  )
}
