import matter from 'gray-matter'
import { Post, Blog, BlogByYear } from '../additional'
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
  private?: boolean
}

export const getSortedPostsData = async (): Promise<BlogByYear> => {
  const data: PostsResponse = await fetchMicroCMS('posts')
  const allPostsData = data.contents.map((content) => {
    const id = content.id
    const matterResult = matter(content.markdown)
    return {
      id,
      ...(matterResult.data as FrontMatter)
    }
  })
  allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
  return allPostsData.reduce<BlogByYear>((result, post) => {
    const year = post.date.slice(0, 4)
    return {
      ...result,
      [year]: result[year] !== undefined ? [...result[year], post] : [post]
    }
  }, {})
}

export const getAllPostIds = async (): Promise<Array<Blog['id']>> => {
  const data: PostsResponse = await fetchMicroCMS('posts')
  return data.contents.map((content) => {
    return content.id
  })
}

export const getPostData = async (id: string): Promise<Post> => {
  const data: PostResponse = await fetchMicroCMS(`posts/${id}`)
  const matterResult = matter(data.markdown)
  const mdxSource = await serialize(matterResult.content)
  return {
    mdxSource,
    title: matterResult.data.title,
    date: matterResult.data.date,
    private: matterResult.data.private ?? false
  }
}
