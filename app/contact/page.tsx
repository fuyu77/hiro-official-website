import type { Metadata } from 'next';
import Layout from '../../components/layout';
import MdxContent from '../../components/mdx-content';
import { getContactData } from '../../lib/contact';

export const metadata: Metadata = {
  title: 'Contact',
};

export default async function ContactPage() {
  const mdxSource = await getContactData();

  return (
    <Layout activeTab="Contact">
      <div className="hero-body container is-max-desktop">
        <article className="content">
          <MdxContent mdxSource={mdxSource} />
        </article>
      </div>
    </Layout>
  );
}
