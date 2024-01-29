import Header from '@/components/Header'
import InsertText from '@/components/InsertText'

export default function Page() {
  return (
    <>
      <Header link={'/'} text={'Preview'} />

      <main>
        <InsertText />
      </main>
    </>
  )
}
