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
  profileData: MdxRemote.Source
}

type Components = {
  [K in keyof MdxRemote.Components]: MdxRemote.Components[K] | typeof Image
}

const components: Components = { Image, InlineWrapper, InlineItem }

const Profile: React.FC<Props> = ({ profileData }) => {
  const content = hydrate(profileData, { components })
  return (
    <Layout activeTab="Profile">
      <Head>
        <title>{`Profile - ${siteTitle}`}</title>
      </Head>
        <div className="hero-body container is-max-desktop">
          <article className="content">
            <Image src="/../public/images/profile.jpg" width="1200" height="1776" />
            {content}
          </article>
        </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const profileData = await getProfileData()
  const mdxProfileData = await renderToString(profileData, { components })
  return {
    props: {
      profileData: mdxProfileData
    }
  }
}

export default Profile
