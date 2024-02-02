'use client'
import { useSearchParams } from 'next/navigation'
import { BoardProvider } from '@/context/BoardContext'
import Header from '@/components/Header'
import ToolBar from '@/components/create/ToolBar'
import Template from '@/components/create/Template'
import Tutorial from '@/components/tutorialModal/step1'

export default function Edit({ tutorial, data }) {
  const query = useSearchParams()
  const board_id = query.get('board_id')
  const tmp = query.get('tmp')
  return (
    <>
      <BoardProvider tmp={tmp} board_id={board_id} data={data}>
        <Header link={'/'} text={'Preview'} />
        <ToolBar />
        <main className="create">
          <Template />
          {tutorial && <Tutorial step={1} />}
        </main>
      </BoardProvider>
    </>
  )
}
