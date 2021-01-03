import Head from 'next/head'
import Link from 'next/link'

export const siteTitle = '榊原紘／衿草遠馬｜Official Website'

const Layout: React.FC<{ activeTab: string }> = ({ children, activeTab }) => {
  return (
    <section className="hero is-fullheight">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="歌人・俳人の榊原紘／衿草遠馬の公式サイトです。掲載情報やブログなど。"
        />
        <meta property="og:image" content="https://hiro-tohma-official-website.com/_next/image?url=%2Fimages%2Fogp.jpg&w=1200&q=75" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="hero-head">
        <header className="navbar">
          <div className="container">
            <div className="navbar-brand">
              <div className="navbar-item is-size-6">
                <Link href="/">
                  <a className="has-text-dark">Hiro & Tohma&apos;s Official Website</a>
                </Link>
              </div>
            </div>
          </div>
        </header>
      </div>
      <main>{children}</main>
      <div className="hero-foot">
        <footer>
          <nav className="tabs is-boxed is-fullwidth">
            <div className="container">
              <ul>
                <li className={activeTab === 'Profile' ? 'is-active' : ''}>
                  <Link href="/profile">
                    <a>Profile</a>
                  </Link>
                </li>
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

export default Layout
