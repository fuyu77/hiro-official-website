import Layout, { siteTitle } from '../components/layout'
import { getContactData } from '../lib/contact'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import { MDXRemote } from 'next-mdx-remote'
import { ContactProps } from '../additional'

const components = {}

const Contact: React.FC<ContactProps> = ({ mdxSource }) => {
  return (
    <Layout activeTab='Contact'>
      <Head>
        <title>{`Contact - ${siteTitle}`}</title>
        <meta name='og:title' content={`Contact - ${siteTitle}`} />
      </Head>
      <div className='hero-body container is-max-desktop'>
        <article className='content'>
          <MDXRemote {...mdxSource} components={components} />
        </article>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<ContactProps> = async () => {
  const mdxSource = await getContactData()
  return {
    props: {
      mdxSource
    }
  }
}

export default Contact
