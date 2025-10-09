import type { Metadata } from 'next';
import { cache } from 'react';
import Layout, { siteTitle } from '../../../components/layout';
import BlogPostClient from '../../../components/blog-post-client';
import MdxContent from '../../../components/mdx-content';
import Image from '../../../components/image';
import Pdf from '../../../components/pdf';
import InlineWrapper from '../../../components/inline-wrapper';
import InlineItem from '../../../components/inline-item';
import { getAllPostIds, getPostData, type PostDetail } from '../../../lib/blog';

const getPostDataCached = cache(async (id: string): Promise<PostDetail> => getPostData(id));

const components = {
  Image,
  Pdf,
  InlineWrapper,
  InlineItem,
};

export async function generateStaticParams() {
  const postIds = await getAllPostIds();

  return postIds.map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const postData = await getPostDataCached(id);
  const title = `${postData.title} - ${siteTitle}`;

  return {
    title: postData.title,
    openGraph: {
      title,
    },
    twitter: {
      title,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postData = await getPostDataCached(id);

  return (
    <Layout activeTab="Blog">
      <BlogPostClient title={postData.title} date={postData.date} isPrivate={postData.private}>
        <MdxContent source={postData.markdown} components={components} />
      </BlogPostClient>
    </Layout>
  );
}
