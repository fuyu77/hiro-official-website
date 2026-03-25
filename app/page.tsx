import dynamic from 'next/dynamic';
import Layout from '../components/layout';
import { getTankasData } from '../lib/tanka';

const HomeClient = dynamic(async () => import('../components/home-client'), {
  ssr: false,
});

export default async function HomePage() {
  const tankasData = await getTankasData();

  return (
    <Layout activeTab="">
      <HomeClient tankasData={tankasData} />
    </Layout>
  );
}
