import HomeClient from '../components/home-client';
import Layout from '../components/layout';
import { getTankasData } from '../lib/tanka';

export default async function HomePage() {
  const tankasData = await getTankasData();

  return (
    <Layout activeTab="">
      <HomeClient tankasData={tankasData} />
    </Layout>
  );
}
