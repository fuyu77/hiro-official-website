import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import utilStyles from '../../styles/utils.module.scss'

export default function Post ({
  postData
}: {
  postData: {
    title: string
    date: string
    contentHtml: string
  }
}) {
  return (
    <Layout activeTab="">
      <Head>
        <title>{postData.title}</title>
      </Head>
      <div className={utilStyles.initial}>
        <div className="hero-body has-background-white">
        <article className="has-background-white content">
          <h1>{postData.title}</h1>
          <div>
            <Date dateString={postData.date} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData((params as ParsedUrlQuery).id as string)
  return {
    props: {
      postData
    }
  }
}
