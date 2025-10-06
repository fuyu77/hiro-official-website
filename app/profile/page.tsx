import type { Metadata } from 'next';
import Layout from '../../components/layout';
import MdxContent from '../../components/mdx-content';
import Image from '../../components/image';
import InlineWrapper from '../../components/inline-wrapper';
import InlineItem from '../../components/inline-item';
import { getProfileData } from '../../lib/profile';

const components = { Image, InlineWrapper, InlineItem };

export const metadata: Metadata = {
  title: 'Profile',
};

export default async function ProfilePage() {
  const markdown = await getProfileData();

  return (
    <Layout activeTab="Profile">
      <div className="hero-body container is-max-desktop">
        <article className="content">
          <MdxContent source={markdown} components={components} />
        </article>
      </div>
    </Layout>
  );
}
