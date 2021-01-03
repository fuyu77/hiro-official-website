import matter from 'gray-matter'

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
  const data: TankasResponse = await fetch(
    'https://hiro-official-website.microcms.io/api/v1/tankas?limit=10000',
    { headers: { 'X-API-KEY': process.env.MICROCMS_API_KEY as string } }
  )
    .then(response => response.json())
  return data.contents.map(content => {
    const matterResult = matter(content.markdown)
    return {
      ...(matterResult.data as FrontMatter)
    }
  })
}
