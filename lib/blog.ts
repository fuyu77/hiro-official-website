import matter from 'gray-matter'
import { fetchMicroCMS } from './micro-cms'

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

export const getSortedPostsData = async () => {
  const data: PostsResponse = await fetchMicroCMS('posts')
  const allPostsData = data.contents.map(content => {
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

export const getAllPostIds = async () => {
  const data: PostsResponse = await fetchMicroCMS('posts')
  return data.contents.map(content => {
    return {
      params: {
        id: content.id
      }
    }
  })
}

export const getPostData = async (id: string) => {
  const data: PostResponse = await fetchMicroCMS(`posts/${id}`)
  const matterResult = matter(data.markdown)
  return {
    mdxContent: matterResult.content,
    ...(matterResult.data as FrontMatter)
  }
}
