import Link from 'next/link'

export default function TutorialStep1() {
  return (
    <>
      <h2>ステップ２</h2>

      <Link href="/tutorial/step3">←ステップ１</Link>
      <Link href="/tutorial/step3">ステップ３→</Link>
    </>
  )
}
