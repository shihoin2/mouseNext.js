import Logo from '@/components/Logo'
import Link from 'next/link'

export default function Page({ link, text }) {
  return (
    <header>
      <h1>
        <Logo />
      </h1>
      <div>
        <Link href={link}>{text}</Link>
      </div>
    </header>
  )
}
