import Layout, { siteTitle } from '../components/layout'
import { getProfileData } from '../lib/profile'
import Head from 'next/head'
import { GetStaticProps } from 'next'

export default function Profile ({
  profileData
}: {
  profileData: string
}) {
  return (
    <Layout activeTab="Profile">
      <Head>
        <title>{`Profile - ${siteTitle}`}</title>
      </Head>
        <div className="hero-body container is-max-desktop">
          <article className="content">
            <div dangerouslySetInnerHTML={{ __html: profileData }} />
          </article>
        </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const profileData = await getProfileData()
  return {
    props: {
      profileData
    }
  }
}
