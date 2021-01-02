import Layout, { siteTitle } from '../components/layout'
import { getContactData } from '../lib/contact'
import Head from 'next/head'
import { GetStaticProps } from 'next'

export default function Contact ({
  contactData
}: {
  contactData: string
}) {
  return (
    <Layout activeTab="Contact">
      <Head>
        <title>{`Contact - ${siteTitle}`}</title>
      </Head>
        <div className="hero-body container is-max-desktop">
          <article className="content">
            <div dangerouslySetInnerHTML={{ __html: contactData }} />
          </article>
        </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const contactData = await getContactData()
  return {
    props: {
      contactData
    }
  }
}
