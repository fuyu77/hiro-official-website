import Layout, { siteTitle } from '../components/layout'
import { getProfileData } from '../lib/profile'
import Head from 'next/head'
import type { GetStaticProps } from 'next'
import { MDXRemote } from 'next-mdx-remote'
import Image from 'next/image'
import InlineWrapper from '../components/inline-wrapper'
import InlineItem from '../components/inline-item'
import type { ProfileProps } from '../additional'

const components = { Image, InlineWrapper, InlineItem }

const Profile: React.FC<ProfileProps> = ({ mdxSource }) => {
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

export const getStaticProps: GetStaticProps<ProfileProps> = async () => {
  const mdxSource = await getProfileData()
  return {
    props: {
      mdxSource
    }
  }
}

export default Profile
