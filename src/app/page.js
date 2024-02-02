import Header from '@/components/Header'

import Template from '@/components/create/Template'
import HtmlToImage from '@/components/create/HtmlToImage';
import AddImage from '@/components/create/AddImage';
import HttpToImage from '@/components/create/HtmlToImage';


export const metadata = {
  title: 'WEAVE',
}

const Home = () => {
  return (
    <>
      <Header link={'/'} text={'My Vision Board'} />
      <main>
        <HttpToImage/>
      </main>
    </>
  )
}
export default Home;
