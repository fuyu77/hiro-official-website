import Layout, { siteTitle } from '../components/layout'
import { getProfileData } from '../lib/profile'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Image from 'next/image'
import InlineWrapper from '../components/inline-wrapper'
import InlineItem from '../components/inline-item'

interface Props {
  mdxSource: MDXRemoteSerializeResult
}

const components = { Image, InlineWrapper, InlineItem }

const Profile: React.FC<Props> = ({ mdxSource }) => {
  return (
    <Layout activeTab='Profile'>
      <Head>
        <title>{`Profile - ${siteTitle}`}</title>
        <meta name='og:title' content={`Profile - ${siteTitle}`} />
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
  const source = await getProfileData()
  const mdxSource = await serialize(source)
  return {
    props: {
      mdxSource
    }
  }
}

export default Profile
