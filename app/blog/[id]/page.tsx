import type { Metadata } from 'next';
import { cache } from 'react';
import Layout, { siteTitle } from '../../../components/layout';
import BlogPostClient from '../../../components/blog-post-client';
import { getAllPostIds, getPostData } from '../../../lib/blog';

const getPostDataCached = cache(async (id: string) => getPostData(id));

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
    <Layout activeTab="">
      <BlogPostClient postData={postData} />
    </Layout>
  );
}
