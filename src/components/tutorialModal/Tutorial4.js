import Image from 'next/image'
import Modal from '@/components/tutorialModal/Modal'
import styles from '@/components/tutorialModal/Tutorial.module.css'

export default function Tutorial4({ board_id, step }) {
  console.log(board_id)
  return (
    <Modal isOpen={true} step={step} prev={3} next="last" board_id={board_id}>
      <section className={styles.container}>
        <div className={`${styles.massageBox} ${styles.massageBox_step4_1}`}>
          <Image
            src="/bubble.png"
            width={200}
            height={100}
            alt="WEAVE"
            priority
            className={`${styles.bubble} ${styles.bubble_step4_1}`}
          />
          <div className={`${styles.message} ${styles.message_step4_1}`}>
            <p>
              グレーのボックスには
              <br />
              画像がアップロードできます
            </p>
          </div>
        </div>
        <div className={`${styles.massageBox} ${styles.massageBox_step4_2}`}>
          <Image
            src="/bubble.png"
            width={200}
            height={100}
            alt="WEAVE"
            priority
            className={`${styles.bubble} ${styles.bubble_step4_2}`}
          />
          <div className={`${styles.message} ${styles.message_step4_2}`}>
            <p>
              ワクワクする画像で
              <br />
              ボードを飾りましょう！
            </p>
          </div>
        </div>
      </section>
    </Modal>
  )
}
