import Layout, { siteTitle } from '../components/layout'
import { getContactData } from '../lib/contact'
import Head from 'next/head'
import { GetStaticProps } from 'next'

interface Props {
  contactData: string
}

const Contact: React.FC<Props> = ({ contactData }) => {
  return (
    <Layout activeTab="Contact">
      <Head>
        <title>{`Contact - ${siteTitle}`}</title>
        <meta name="og:title" content={`Contact - ${siteTitle}`} />
      </Head>
        <div className="hero-body container is-max-desktop">
          <article className="content">
            <div dangerouslySetInnerHTML={{ __html: contactData }} />
          </article>
        </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const contactData = await getContactData()
  return {
    props: {
      contactData
    }
  }
}

export default Contact
