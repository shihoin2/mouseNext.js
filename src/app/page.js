import Header from '@/components/Header'
import FeedTemplate from '@/components/feed/FeedTemplate'
import HtmlToImage from '@/components/HtmlToImage'

export const metadata = {
  title: 'WEAVE',
}

const Home = () => {
  return (
    <>
      <Header link={'/myboard'} text={'My Vision Board'} />
      <main>
        <FeedTemplate />
      </main>
    </>
  )
}
export default Home
