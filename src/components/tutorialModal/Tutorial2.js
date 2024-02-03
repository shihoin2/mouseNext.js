import Image from 'next/image'
import Modal from '@/components/tutorialModal/Modal'
import styles from '@/components/tutorialModal/Tutorial.module.css'

export default function Tutorial2({ board_id, step }) {
  console.log(board_id)
  return (
    <Modal isOpen={true} step={step} prev={1} next={3} board_id={board_id}>
      <section className={styles.container}>
        <div className={`${styles.massageBox} ${styles.massageBox_step2_1}`}>
          <Image
            src="/bubble.png"
            width={200}
            height={100}
            alt="WEAVE"
            priority
            className={`${styles.bubble} ${styles.bubble_step2_1}`}
          />
          <div className={`${styles.message} ${styles.message_step2_1}`}>
            <p>
              ６つの項目があります！
              <br />
              夢や目標、理想の生活...
            </p>
          </div>
        </div>
        <div className={`${styles.massageBox} ${styles.massageBox_step2_2}`}>
          <Image
            src="/bubble.png"
            width={200}
            height={100}
            alt="WEAVE"
            priority
            className={`${styles.bubble} ${styles.bubble_step2_2}`}
          />
          <div className={`${styles.message} ${styles.message_step2_2}`}>
            <p>
              どんな１年にしたいか
              <br />
              想いを膨らませましょう！
            </p>
          </div>
        </div>
      </section>
    </Modal>
  )
}
