import Header from '@/components/Header'
import Template from '@/components/create/Template'
import HtmlToImage from '@/components/create/HtmlToImage';
import AddImage from '@/components/create/AddImage';
import FeedTemplate from '@/components/feed/FeedTemplate'



export const metadata = {
    title: 'WEAVE',
}

const Home = () => {
    return (
        <>
        <Header link={'/myboard'} text={'My Vision Board'} />
        <main>
            <FeedTemplate />
            <HttpToImage/>
        </main>
        </>
    );

}
export default Home;
