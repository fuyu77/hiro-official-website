import Layout, { siteTitle } from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/blog'
import Head from 'next/head'
import Date from '../../components/date'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { MDXRemote } from 'next-mdx-remote'
import Pdf from '../../components/pdf'
import Image from 'next/image'
import InlineWrapper from '../../components/inline-wrapper'
import InlineItem from '../../components/inline-item'
import { BlogsProps } from '../../additional'

const components = {
  Image,
  Pdf,
  InlineWrapper,
  InlineItem
}

const Post: React.FC<BlogsProps> = ({ postData }) => {
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
          <div>
            <MDXRemote {...postData.mdxSource} components={components} />
          </div>
        </article>
      </div>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postIds = await getAllPostIds()
  return {
    paths: postIds.map((id) => {
      return {
        params: {
          id: id
        }
      }
    }),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<BlogsProps> = async ({ params }) => {
  const postData = await getPostData((params as ParsedUrlQuery).id as string)
  return {
    props: {
      postData: {
        title: postData.title,
        date: postData.date,
        mdxSource: postData.mdxSource
      }
    }
  }
}

export default Post
