import Logo from '@/components/Logo'
import Link from 'next/link'

export default function Page({ link, text }) {
  return (
    <header>
      <h1>
        <Link href={'/'}>
          <Logo />
        </Link>
      </h1>
      <div className={'link_btn'}>
        <Link href={link}>{text}</Link>
      </div>
    </header>
  )
}
