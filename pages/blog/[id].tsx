import { useState, useRef, useEffect } from 'react';
import Layout, { siteTitle } from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/blog';
import Head from 'next/head';
import { Date } from '../../components/date';
import type { GetStaticProps, GetStaticPaths } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import Image from '../../components/image';
import Pdf from '../../components/pdf';
import InlineWrapper from '../../components/inline-wrapper';
import InlineItem from '../../components/inline-item';
import type { PostProps } from '../../additional';

const components = {
  Image,
  Pdf,
  InlineWrapper,
  InlineItem,
};

export default function Post({ postData }: PostProps) {
  const [verified, setVerified] = useState<boolean>(false);
  const [speechButtonText, setSpeechButtonText] = useState<string>('音読する');
  const body = useRef<HTMLDivElement>(null);

  useEffect(
    () => () => {
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
    },
    []
  );

  const changePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value === process.env.NEXT_PUBLIC_BLOG_PASSWORD) {
      setVerified(true);
    }
  };

  const speak = (): React.MouseEventHandler<HTMLButtonElement> | undefined => {
    const text = body.current?.textContent;
    if (!text) {
      return;
    }

    if (!speechSynthesis.speaking) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
      setSpeechButtonText('停止する');
    } else if (speechSynthesis.paused) {
      speechSynthesis.resume();
      setSpeechButtonText('停止する');
    } else {
      speechSynthesis.pause();
      setSpeechButtonText('再開する');
    }
  };

  return (
    <Layout activeTab="">
      <Head>
        <title>{`${postData.title} - ${siteTitle}`}</title>
        <meta name="og:title" content={`${postData.title} - ${siteTitle}`} />
      </Head>
      <div className="hero-body container is-max-desktop">
        <article className="content">
          {!postData.private || verified ? (
            <div>
              <Date dateString={postData.date} />
              <h1>{postData.title}</h1>
              <div>
                <button type="button" className="button" onClick={speak}>
                  {speechButtonText}
                </button>
                <div ref={body}>
                  <div />
                  <MDXRemote {...postData.mdxSource} components={components} />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <label className="label">パスワード</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="入力してください"
                  onChange={changePassword}
                />
              </div>
            </div>
          )}
        </article>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postIds = await getAllPostIds();
  return {
    paths: postIds.map((id) => ({
      params: {
        id,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
  const postData = await getPostData(params!.id as string);
  return {
    props: {
      postData: {
        title: postData.title,
        date: postData.date,
        private: postData.private,
        mdxSource: postData.mdxSource,
      },
    },
  };
};
