import Header from '@/components/Header'

import Template from '@/components/create/Template'
import HtmlToImage from '@/components/HtmlToImage';


export const metadata = {
  title: 'WEAVE',
}

const Home = () => {
  return (
    <>
      <Header link={'/'} text={'My Vision Board'} />
      <main>
        <Template/>


      </main>
    </>
  )
}
export default Home;
