import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'

const Home: React.FC = () => {
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

export default Home
