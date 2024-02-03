import Image from 'next/image'
import styles from './Help.module.css'
import Header from '@/components/Header'

export default function Page({ boart_id }) {
  return (
    <>
      <Header link={`/edit?boart_id${boart_id}`} text={'Back'} />
      <main className={styles.container}>
        <Image
          className={styles.thumbnail}
          src="/demo.png"
          width={1000}
          height={50}
          priority></Image>
      </main>
    </>
  )
}
