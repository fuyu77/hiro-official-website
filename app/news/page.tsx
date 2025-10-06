import type { Metadata } from 'next';
import Layout from '../../components/layout';
import NewsClient from '../../components/news-client';
import { getSortedNewsData } from '../../lib/news';

export const metadata: Metadata = {
  title: 'News',
};

export default async function NewsPage() {
  const allNewsData = await getSortedNewsData();
  const years = Object.keys(allNewsData).sort((a, b) => {
    if (a < b) {
      return 1;
    }

    return -1;
  });

  return (
    <Layout activeTab="News">
      <NewsClient allNewsData={allNewsData} years={years} />
    </Layout>
  );
}
