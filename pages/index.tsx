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
              <div className="navbar-item title is-5 has-text-white">
                Hiro&apos;s Official Website
              </div>
            </div>
          </div>
        </header>
      </div>
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">
            Title
          </h1>
          <h2 className="subtitle">
            Subtitle
          </h2>
        </div>
      </div>
    </Layout>
  )
}
