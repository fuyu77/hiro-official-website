export const fetchMicroCMS = async <T>(path: string, limit = 10000): Promise<T> => {
  const root = 'https://hiro-official-website.microcms.io/api/v1/'
  const response = await fetch(`${root}${path}?limit=${limit}`, {
    headers: { 'X-API-KEY': process.env.MICROCMS_API_KEY as string }
  })
  return response.json()
}
