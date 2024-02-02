import Header from '@/components/Header'
import FeedMyBoard from '@/components/feed/FeedMyBoard'

export const metadata = {
    title: 'WEAVE',
}

const Home = () => {
    return (
        <>
        <Header link={'/'} text={'Home'} />
        <main>
            <FeedMyBoard />
        </main>
        </>
    )
}
export default Home;
