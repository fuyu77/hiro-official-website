import { fetchMicroCms } from './micro-cms';
import { serialize } from 'next-mdx-remote/serialize';
import type { ProfileProps } from '../additional';

interface ContactResponse {
  markdown: string;
}

export const getProfileData = async (): Promise<ProfileProps['mdxSource']> => {
  const data: ContactResponse = await fetchMicroCms('profile');
  return serialize(data.markdown);
};
