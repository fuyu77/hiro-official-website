import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'

export default function Home () {
  return (
    <Layout activeTab="">
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="hero-body container">
      </div>
    </Layout>
  )
}
