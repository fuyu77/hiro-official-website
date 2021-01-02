import Head from 'next/head'
import Link from 'next/link'

export const siteTitle = '榊原紘／衿草遠馬｜Official Website'

export default function Layout ({
  children,
  activeTab
}: {
  children: React.ReactNode
  activeTab: string
}) {
  return (
    <section className="hero is-fullheight">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="歌人・俳人の榊原紘／衿草遠馬の公式サイトです。掲載情報やブログなど。"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>{children}</main>
      <div className="hero-foot">
        <footer>
          <nav className="tabs is-boxed is-fullwidth">
            <div className="container">
              <ul>
                <li className={activeTab === 'Profile' ? 'is-active' : ''}><a>Profile</a></li>
                <li className={activeTab === 'News' ? 'is-active' : ''}>
                  <Link href="/news">
                    <a>News</a>
                  </Link>
                </li>
                <li className={activeTab === 'Blog' ? 'is-active' : ''}>
                  <Link href="/blog">
                    <a>Blog</a>
                  </Link>
                </li>
                <li className={activeTab === 'Contact' ? 'is-active' : ''}>
                  <Link href="/contact">
                    <a>Contact</a>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </footer>
      </div>
    </section>
  )
}
