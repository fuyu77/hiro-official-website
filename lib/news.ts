import matter from 'gray-matter'
import { fetchMicroCMS } from './micro-cms'

interface NewsResponse {
  contents: {
    id: string
    markdown: string
  }[]
}

interface FrontMatter {
  date: string
  title: string
  url: string
}

export const getSortedNewsData = async () => {
  const data: NewsResponse = await fetchMicroCMS('news')
  const allNewsData = data.contents.map((content) => {
    const matterResult = matter(content.markdown)
    return {
      id: content.id,
      ...(matterResult.data as FrontMatter)
    }
  })
  return allNewsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}
