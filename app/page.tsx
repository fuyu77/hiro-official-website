import Layout from '../components/layout';
import HomeClient from '../components/home-client';
import { getTankasData } from '../lib/tanka';

export default async function HomePage() {
  const tankasData = await getTankasData();

  return (
    <Layout activeTab="">
      <HomeClient tankasData={tankasData} />
    </Layout>
  );
}
