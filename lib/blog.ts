import matter from 'gray-matter'
import { Blog, BlogData } from '../additional'
import { fetchMicroCMS } from './micro-cms'
import { serialize } from 'next-mdx-remote/serialize'

interface PostResponse {
  id: string
  markdown: string
}
interface PostsResponse {
  contents: PostResponse[]
}

interface FrontMatter {
  date: string
  title: string
}

export const getSortedPostsData = async (): Promise<BlogData[]> => {
  const data: PostsResponse = await fetchMicroCMS('posts')
  const allPostsData = data.contents.map((content) => {
    const id = content.id
    const matterResult = matter(content.markdown)
    return {
      id,
      ...(matterResult.data as FrontMatter)
    }
  })
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export const getAllPostIds = async (): Promise<Array<BlogData['id']>> => {
  const data: PostsResponse = await fetchMicroCMS('posts')
  return data.contents.map((content) => {
    return content.id
  })
}

export const getPostData = async (id: string): Promise<Blog> => {
  const data: PostResponse = await fetchMicroCMS(`posts/${id}`)
  const matterResult = matter(data.markdown)
  const mdxSource = await serialize(matterResult.content)
  return {
    mdxSource,
    ...(matterResult.data as FrontMatter)
  }
}
