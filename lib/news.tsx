import matter from 'gray-matter'

interface NewsResponse {
  contents: {
    id: string;
    markdownContent: string;
  }[]
}

interface FrontMatter {
  date: string;
  title: string;
  url: string;
}

export const getSortedNewsData = async () => {
  const data: NewsResponse = await fetch(
    'https://hiro-official-website.microcms.io/api/v1/news',
    { headers: { 'X-API-KEY': process.env.MICROCMS_API_KEY as string } }
  )
    .then(response => response.json())
  const allNewsData = data.contents.map(content => {
    const matterResult = matter(content.markdownContent)
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
