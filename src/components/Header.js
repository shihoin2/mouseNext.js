import Logo from '@/components/Logo'
import Link from 'next/link'

export default function Page({ link, text,handleLinkClick }) {
  return (
    <header>
      <h1>
        <Link href={'/'} onClick={handleLinkClick}>
          <Logo />
        </Link>
      </h1>
      <div className={'link_btn'}>
        <Link href={link} onClick={handleLinkClick}>{text}</Link>
      </div>
    </header>
  )
}
