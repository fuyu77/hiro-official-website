import { fetchMicroCms } from './micro-cms';

interface ContactResponse {
  markdown: string;
}

export const getContactData = async (): Promise<string> => {
  const data: ContactResponse = await fetchMicroCms('contact');
  return data.markdown;
};
