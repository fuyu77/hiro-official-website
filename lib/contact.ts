import { fetchMicroCms } from './micro-cms';
import { serialize } from 'next-mdx-remote/serialize';
import type { ContactProps } from '../additional';

interface ContactResponse {
  markdown: string;
}

export const getContactData = async (): Promise<ContactProps['mdxSource']> => {
  const data: ContactResponse = await fetchMicroCms('contact');
  return serialize(data.markdown);
};
