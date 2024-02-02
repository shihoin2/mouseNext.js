import Link from 'next/link'

export default function TutorialStep1({ boardId }) {
  return (
    <>
      <h2>ステップ３</h2>

      <Link href="/tutorial/step3">←ステップ２</Link>
      <Link href={`/edit?board_id=${boardId}`}></Link>
    </>
  )
}
