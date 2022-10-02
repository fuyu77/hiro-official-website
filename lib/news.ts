import matter from 'gray-matter'
import { fetchMicroCMS } from './micro-cms'
import { NewsByYear } from '../additional'

interface NewsResponse {
  contents: Array<{
    id: string
    markdown: string
  }>
}

interface FrontMatter {
  date: string
  title: string
  url: string
}

export const getSortedNewsData = async (): Promise<NewsByYear> => {
  const data: NewsResponse = await fetchMicroCMS('news')
  const allNewsData = data.contents.map((content) => {
    const matterResult = matter(content.markdown)
    return {
      id: content.id,
      ...(matterResult.data as FrontMatter)
    }
  })
  allNewsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
  return allNewsData.reduce<NewsByYear>((result, post) => {
    const year = post.date.slice(0, 4)
    return {
      ...result,
      [year]: result[year] !== undefined ? [...result[year], post] : [post]
    }
  }, {})
}
