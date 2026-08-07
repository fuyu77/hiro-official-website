export const fetchMicroCms = async <T>(path: string, limit = 10000): Promise<T> => {
  const root = 'https://hiro-official-website.microcms.io/api/v1/';
  const apiKey = process.env.MICROCMS_API_KEY;
  if (!apiKey) {
    throw new Error('MICROCMS_API_KEY is not set');
  }
  const response = await fetch(`${root}${path}?limit=${limit}`, {
    headers: { 'X-MICROCMS-API-KEY': apiKey },
  });
  return response.json() as Promise<T>;
};
