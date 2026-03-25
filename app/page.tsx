import Layout from '../components/layout';
import HomeClientLoader from '../components/home-client-loader';
import { getTankasData } from '../lib/tanka';

export default async function HomePage() {
  const tankasData = await getTankasData();

  return (
    <Layout activeTab="">
      <HomeClientLoader tankasData={tankasData} />
    </Layout>
  );
}
