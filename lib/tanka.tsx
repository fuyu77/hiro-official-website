import matter from 'gray-matter'
import { fetchMicroCMS } from './micro-cms'

interface TankasResponse {
  contents: {
    markdown: string
  }[]
}

interface FrontMatter {
  title: string
  source: string
}

export const getTankasData = async () => {
  const data: TankasResponse = await fetchMicroCMS('tankas')
  return data.contents.map(content => {
    const matterResult = matter(content.markdown)
    return {
      ...(matterResult.data as FrontMatter)
    }
  })
}
