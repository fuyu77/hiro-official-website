import Layout, { siteTitle } from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/blog'
import Head from 'next/head'
import Date from '../../components/date'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'

interface Props {
  postData: {
    title: string
    date: string
    contentHtml: string
  }
}

const Post: React.FC<Props> = ({ postData }) => {
  return (
    <Layout activeTab="">
      <Head>
        <title>{`${postData.title} - ${siteTitle}`}</title>
        <meta name="og:title" content={`${postData.title} - ${siteTitle}`} />
      </Head>
        <div className="hero-body container is-max-desktop">
          <article className="content">
            <h1>{postData.title}</h1>
            <div>
              <Date dateString={postData.date} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
          </article>
        </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const postData = await getPostData((params as ParsedUrlQuery).id as string)
  return {
    props: {
      postData
    }
  }
}

export default Post
