import Head from 'next/head'

export const siteTitle = '榊原紘｜Official Website'

export default function Layout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <section className="hero is-success is-fullheight">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="歌人・俳人の榊原紘の公式サイトです。掲載情報やブログなど。"
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
      <div className="hero-head">
        <header className="navbar">
          <div className="container">
            <div className="navbar-brand">
              <div className="navbar-item title is-5 has-text-white">
                Hiro&apos;s Official Website
              </div>
            </div>
          </div>
        </header>
      </div>
      <main>{children}</main>
      <div className="hero-foot">
        <nav className="tabs is-boxed is-fullwidth">
          <div className="container">
            <ul>
              <li className="is-active"><a>Profile</a></li>
              <li><a>News</a></li>
              <li><a>Blog</a></li>
              <li><a>Contact</a></li>
            </ul>
          </div>
        </nav>
      </div>
    </section>
  )
}
