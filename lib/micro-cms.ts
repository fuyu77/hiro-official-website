export const fetchMicroCms = async <T>(path: string, limit = 10000): Promise<T> => {
  const root = 'https://hiro-official-website.microcms.io/api/v1/';
  const response = await fetch(`${root}${path}?limit=${limit}`, {
    headers: { 'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY! },
  });
  return response.json() as Promise<T>;
};
