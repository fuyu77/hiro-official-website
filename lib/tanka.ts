import matter from 'gray-matter'
import { fetchMicroCMS } from './micro-cms'
import { Tanka } from '../additional'

interface TankasResponse {
  contents: Array<{
    markdown: string
  }>
}

interface FrontMatter {
  title: string
  source: string
}

export const getTankasData = async (): Promise<Tanka[]> => {
  const data: TankasResponse = await fetchMicroCMS('tankas')
  return data.contents.map((content) => {
    const matterResult = matter(content.markdown)
    return {
      ...(matterResult.data as FrontMatter)
    }
  })
}
