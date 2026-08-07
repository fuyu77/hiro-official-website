import matter from '@11ty/gray-matter';
import type { Tanka } from '../additional';
import { fetchMicroCms } from './micro-cms';

interface TankasResponse {
  contents: Array<{
    markdown: string;
  }>;
}

interface FrontMatter {
  title: string;
  source: string;
}

export const getTankasData = async (): Promise<Tanka[]> => {
  const data: TankasResponse = await fetchMicroCms('tankas');
  return data.contents.map((content) => {
    const matterResult = matter(content.markdown);
    return {
      ...(matterResult.data as FrontMatter),
    };
  });
};
