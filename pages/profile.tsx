import Layout, { siteTitle } from '../components/layout'
import { getProfileData } from '../lib/profile'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import { MdxRemote } from 'next-mdx-remote/types'
import Image from 'next/image'
import InlineWrapper from '../components/inline-wrapper'
import InlineItem from '../components/inline-item'

interface Props {
  htmlContent: MdxRemote.Source
}

const components: MdxRemote.Components = { Image, InlineWrapper, InlineItem }

const Profile: React.FC<Props> = ({ htmlContent }) => {
  const content = hydrate(htmlContent, { components })
  return (
    <Layout activeTab='Profile'>
      <Head>
        <title>{`Profile - ${siteTitle}`}</title>
        <meta name='og:title' content={`Profile - ${siteTitle}`} />
      </Head>
      <div className='hero-body container is-max-desktop'>
        <article className='content'>{content}</article>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const mdxContent = await getProfileData()
  const htmlContent = await renderToString(mdxContent, { components })
  return {
    props: {
      htmlContent
    }
  }
}

export default Profile
