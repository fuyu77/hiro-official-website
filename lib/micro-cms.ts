export const fetchMicroCMS = async (path: string, limit: number = 10000) => {
  const root = 'https://hiro-official-website.microcms.io/api/v1/'
  const response = await fetch(`${root}${path}?limit=${limit}`, {
    headers: { 'X-API-KEY': process.env.MICROCMS_API_KEY as string }
  })
  return response.json()
}
