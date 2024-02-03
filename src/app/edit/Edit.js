import { useSearchParams } from 'next/navigation'
import { BoardProvider } from '@/context/BoardContext'
import Header from '@/components/Header'
import ToolBar from '@/components/create/ToolBar'
import Template from '@/components/create/Template'
import Tutorial1 from '@/components/tutorialModal/Tutorial1'
import Tutorial2 from '@/components/tutorialModal/Tutorial2'
import Tutorial3 from '@/components/tutorialModal/Tutorial3'
import Tutorial4 from '@/components/tutorialModal/Tutorial4'
import modalStyles from '@/components/tutorialModal/Modal.module.css'

export default function Edit({ tutorial, step, data }) {
  const query = useSearchParams()
  const board_id = query.get('board_id')
  const tmp = query.get('tmp')

  return (
    <>
      <BoardProvider tmp={tmp} board_id={board_id} data={data}>
        <Header link={'/'} text={'Preview'} />
        <ToolBar />
        <main className={modalStyles.hidden}>
          <Template />
          {tutorial && step === 1 && <Tutorial1 step={1} board_id={board_id} />}
          {tutorial && step === 2 && <Tutorial2 step={2} board_id={board_id} />}
          {tutorial && step === 3 && <Tutorial3 step={3} board_id={board_id} />}
          {tutorial && step === 4 && <Tutorial4 step={4} board_id={board_id} />}
        </main>
      </BoardProvider>
    </>
  )
}
