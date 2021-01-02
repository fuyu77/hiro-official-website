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

const components = { Image, InlineWrapper, InlineItem }

export default function Profile ({
  profileData
}: {
  profileData: MdxRemote.Source
}) {
  const content = hydrate(profileData, { components })
  return (
    <Layout activeTab="Profile">
      <Head>
        <title>{`Profile - ${siteTitle}`}</title>
      </Head>
        <div className="hero-body container is-max-desktop">
          <article className="content">
            {content}
          </article>
        </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const profileData = await getProfileData()
  const mdxProfileData = await renderToString(profileData, { components })
  return {
    props: {
      profileData: mdxProfileData
    }
  }
}
