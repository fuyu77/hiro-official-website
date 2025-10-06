import type { Metadata } from 'next';
import Layout from '../../components/layout';
import BlogClient from '../../components/blog-client';
import { getSortedPostsData } from '../../lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
};

export default async function BlogPage() {
  const allPostsData = await getSortedPostsData();
  const years = Object.keys(allPostsData).sort((a, b) => {
    if (a < b) {
      return 1;
    }

    return -1;
  });

  return (
    <Layout activeTab="Blog">
      <BlogClient allPostsData={allPostsData} years={years} />
    </Layout>
  );
}
