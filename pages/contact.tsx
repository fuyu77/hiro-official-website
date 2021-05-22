import Layout, { siteTitle } from '../components/layout'
import { getContactData } from '../lib/contact'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

interface Props {
  mdxSource: MDXRemoteSerializeResult
}

const components = {}

const Contact: React.FC<Props> = ({ mdxSource }) => {
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

export const getStaticProps: GetStaticProps<Props> = async () => {
  const source = await getContactData()
  const mdxSource = await serialize(source)
  return {
    props: {
      mdxSource
    }
  }
}

export default Contact
