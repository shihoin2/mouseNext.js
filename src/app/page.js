import Header from '@/components/Header'
<<<<<<< HEAD

import Template from '@/components/create/Template'
import HtmlToImage from '@/components/create/HtmlToImage';
import AddImage from '@/components/create/AddImage';
import HttpToImage from '@/components/create/HtmlToImage';
=======
import FeedTemplate from '@/components/feed/FeedTemplate'
import HtmlToImage from '@/components/HtmlToImage';
>>>>>>> master

export const metadata = {
    title: 'WEAVE',
}

const Home = () => {
<<<<<<< HEAD
  return (
    <>
      <Header link={'/'} text={'My Vision Board'} />
      <main>
        <HttpToImage/>
      </main>
    </>
  )
=======
    return (
        <>
        <Header link={'/myboard'} text={'My Vision Board'} />
        <main>
            <FeedTemplate />
        </main>
        </>
    )
>>>>>>> master
}
export default Home;
