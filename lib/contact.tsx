import { fetchMicroCMS } from './micro-cms'

interface ContactResponse {
  markdown: string
}

export const getContactData = async () => {
  const data: ContactResponse = await fetchMicroCMS('contact')
  return data.markdown
}
