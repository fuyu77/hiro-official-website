import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'

export default function Home () {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
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
