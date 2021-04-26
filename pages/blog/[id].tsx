import Layout, { siteTitle } from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/blog'
import Head from 'next/head'
import Date from '../../components/date'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import { MdxRemote } from 'next-mdx-remote/types'
import Pdf from '../../components/pdf'
import InlineWrapper from '../../components/inline-wrapper'
import InlineItem from '../../components/inline-item'

interface Props {
  postData: {
    title: string
    date: string
    htmlContent: MdxRemote.Source
  }
}

const components: MdxRemote.Components = { Pdf, InlineWrapper, InlineItem }

const Post: React.FC<Props> = ({ postData }) => {
  const content = hydrate(postData.htmlContent, { components })
  return (
    <Layout activeTab=''>
      <Head>
        <title>{`${postData.title} - ${siteTitle}`}</title>
        <meta name='og:title' content={`${postData.title} - ${siteTitle}`} />
      </Head>
      <div className='hero-body container is-max-desktop'>
        <article className='content'>
          <h1>{postData.title}</h1>
          <div>
            <Date dateString={postData.date} />
          </div>
          <div>{content}</div>
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
  const htmlContent = await renderToString(postData.mdxContent, {})
  return {
    props: {
      postData: {
        title: postData.title,
        date: postData.date,
        htmlContent
      }
    }
  }
}

export default Post
