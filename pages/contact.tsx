import Layout, { siteTitle } from '../components/layout'
import { getContactData } from '../lib/contact'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import { MdxRemote } from 'next-mdx-remote/types'

interface Props {
  htmlContent: MdxRemote.Source
}

const Contact: React.FC<Props> = ({ htmlContent }) => {
  const content = hydrate(htmlContent, {})
  return (
    <Layout activeTab='Contact'>
      <Head>
        <title>{`Contact - ${siteTitle}`}</title>
        <meta name='og:title' content={`Contact - ${siteTitle}`} />
      </Head>
      <div className='hero-body container is-max-desktop'>
        <article className='content'>{content}</article>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const mdxContent = await getContactData()
  const htmlContent = await renderToString(mdxContent, {})
  return {
    props: {
      htmlContent
    }
  }
}

export default Contact
