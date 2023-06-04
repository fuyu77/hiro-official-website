import matter from 'gray-matter';
import type { Post, Blog, BlogByYear } from '../additional';
import { fetchMicroCms } from './micro-cms';
import { serialize } from 'next-mdx-remote/serialize';

interface PostResponse {
  id: string;
  markdown: string;
}

interface PostsResponse {
  contents: PostResponse[];
}

interface FrontMatter {
  date: string;
  title: string;
  private?: boolean;
}

export const getSortedPostsData = async (): Promise<BlogByYear> => {
  const data: PostsResponse = await fetchMicroCms('posts');
  const allPostsData = data.contents.map((content) => {
    const { id } = content;
    const matterResult = matter(content.markdown);
    return {
      id,
      ...(matterResult.data as FrontMatter),
    };
  });
  allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    }

    return -1;
  });
  return allPostsData.reduce<BlogByYear>((result, post) => {
    const year = post.date.slice(0, 4);
    return {
      ...result,
      [year]: result[year] ? [...result[year], post] : [post],
    };
  }, {});
};

export const getAllPostIds = async (): Promise<Array<Blog['id']>> => {
  const data: PostsResponse = await fetchMicroCms('posts');
  return data.contents.map((content) => content.id);
};

export const getPostData = async (id: string): Promise<Post> => {
  const data: PostResponse = await fetchMicroCms(`posts/${id}`);
  const matterResult = matter(data.markdown);
  const mdxSource = await serialize(matterResult.content);
  return {
    mdxSource,
    title: matterResult.data.title as string,
    date: matterResult.data.date as string,
    private: Boolean(matterResult.data.private),
  };
};
