import Layout, { siteTitle } from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/blog'
import Head from 'next/head'
import Date from '../../components/date'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Pdf from '../../components/pdf'
import Image from 'next/image'
import InlineWrapper from '../../components/inline-wrapper'
import InlineItem from '../../components/inline-item'

interface Props {
  postData: {
    title: string
    date: string
    mdxSource: MDXRemoteSerializeResult
  }
}

const components = {
  Image,
  Pdf,
  InlineWrapper,
  InlineItem
}

const Post: React.FC<Props> = ({ postData }) => {
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
  const paths = await getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const postData = await getPostData((params as ParsedUrlQuery).id as string)
  const mdxSource = await serialize(postData.mdxContent)
  return {
    props: {
      postData: {
        title: postData.title,
        date: postData.date,
        mdxSource
      }
    }
  }
}

export default Post
