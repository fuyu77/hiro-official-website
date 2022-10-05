import { useState, useRef } from 'react'
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
import { PostProps } from '../../additional'

const components = {
  Image,
  Pdf,
  InlineWrapper,
  InlineItem
}

const Post: React.FC<PostProps> = ({ postData }) => {
  const [verified, setVerified] = useState<boolean>(false)
  const [speaking, setSpeaking] = useState<boolean>(false)
  const [speechStarted, setSpeechStarted] = useState<boolean>(false)
  const [speechButtonText, setSpeechButtonText] = useState<string>('音読する')
  const content = useRef<HTMLDivElement>(null)

  const changePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value === process.env.NEXT_PUBLIC_BLOG_PASSWORD) {
      setVerified(true)
    }
  }

  const speak = (): React.MouseEventHandler<HTMLButtonElement> | undefined => {
    if (!speechStarted) {
      const text = content.current?.textContent
      if (text == null) {
        return
      }

      const utterance = new SpeechSynthesisUtterance(text)
      speechSynthesis.speak(utterance)
      setSpeaking(true)
      setSpeechStarted(true)
      setSpeechButtonText('停止する')
    } else if (speaking) {
      speechSynthesis.pause()
      setSpeaking(false)
      setSpeechButtonText('再開する')
    } else {
      speechSynthesis.resume()
      setSpeaking(true)
      setSpeechButtonText('停止する')
    }
  }

  return (
    <Layout activeTab=''>
      <Head>
        <title>{`${postData.title} - ${siteTitle}`}</title>
        <meta name='og:title' content={`${postData.title} - ${siteTitle}`} />
      </Head>
      <div className='hero-body container is-max-desktop'>
        <article className='content'>
          {!postData.private || verified ? (
            <div>
              <Date dateString={postData.date} />
              <h1>{postData.title}</h1>
              <div>
                <button className='button' onClick={speak}>
                  {speechButtonText}
                </button>
                <div ref={content}>
                  <div />
                  <MDXRemote {...postData.mdxSource} components={components} />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <label className='label'>パスワード</label>
              <div className='control'>
                <input
                  className='input'
                  type='text'
                  placeholder='入力してください'
                  onChange={changePassword}
                />
              </div>
            </div>
          )}
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
          id
        }
      }
    }),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
  const postData = await getPostData((params as ParsedUrlQuery).id as string)
  return {
    props: {
      postData: {
        title: postData.title,
        date: postData.date,
        private: postData.private,
        mdxSource: postData.mdxSource
      }
    }
  }
}

export default Post
