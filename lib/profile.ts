import { fetchMicroCms } from './micro-cms';

interface ProfileResponse {
  markdown: string;
}

export const getProfileData = async (): Promise<string> => {
  const data: ProfileResponse = await fetchMicroCms('profile');
  return data.markdown;
};
