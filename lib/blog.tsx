import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

interface PostResponse {
  id: string;
  markdown: string;
}
interface PostsResponse {
  contents: PostResponse[]
}

interface FrontMatter {
  date: string;
  title: string;
}

export const getSortedPostsData = async () => {
  const data: PostsResponse = await fetch(
    'https://hiro-official-website.microcms.io/api/v1/posts',
    { headers: { 'X-API-KEY': process.env.MICROCMS_API_KEY as string } }
  )
    .then(response => response.json())
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
  const data: PostsResponse = await fetch(
    'https://hiro-official-website.microcms.io/api/v1/posts',
    { headers: { 'X-API-KEY': process.env.MICROCMS_API_KEY as string } }
  )
    .then(response => response.json())
  return data.contents.map(content => {
    return {
      params: {
        id: content.id
      }
    }
  })
}

export const getPostData = async (id: string) => {
  const data: PostResponse = await fetch(
    `https://hiro-official-website.microcms.io/api/v1/posts/${id}`,
    { headers: { 'X-API-KEY': process.env.MICROCMS_API_KEY as string } }
  )
    .then(response => response.json())
  const matterResult = matter(data.markdown)
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()
  return {
    id,
    contentHtml,
    ...(matterResult.data as FrontMatter)
  }
}
