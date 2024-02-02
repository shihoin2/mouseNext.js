import Modal from '@/components/tutorialModal/Modal'
import Image from 'next/image'
import styles from '@/components/tutorialModal/Tutorial.module.css'

export default function Tutorial1({ board_id, step }) {
  console.log(board_id)

  return (
    <Modal isOpen={true} step={step} prev={null} next={2} board_id={board_id}>
      <section className={styles.container}>
        {/* <h2>ステップ１</h2> */}
        <Image
          src="/bubble.png"
          width={200}
          height={100}
          alt="WEAVE"
          priority
          className={`${styles.bubble} ${styles.bubble_name}`}
        />
        <Image
          src="/bubble.png"
          width={200}
          height={100}
          alt="WEAVE"
          priority
          className={`${styles.bubble} ${styles.bubble2}`}
        />
      </section>
    </Modal>
  )
}
