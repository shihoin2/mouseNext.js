import '@/app/global.css'
import Footer from '@/components/Footer'
export const metadata = {
  title: 'Laravel',
}
const RootLayout = ({ children }) => {
  return (
    <html lang="ja">
      <body className="antialiased">
        {children}
        <Footer />
      </body>
    </html>
  )
}

export default RootLayout
