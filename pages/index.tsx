import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'

export default function Home () {
  return (
    <Layout activeTab="">
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="hero-head">
        <header className="navbar">
          <div className="container">
            <div className="navbar-brand">
              <div className="navbar-item title is-5">
                Hiro & Tohma&apos;s Official Website
              </div>
            </div>
          </div>
        </header>
      </div>
      <div className="hero-body">
      </div>
    </Layout>
  )
}
