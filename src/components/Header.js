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
        <Link href={link}>{text}</Link>
    </header>
  )
}
