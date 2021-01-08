import { fetchMicroCMS } from './micro-cms'

interface ContactResponse {
  markdown: string
}

export const getProfileData = async () => {
  const data: ContactResponse = await fetchMicroCMS('profile')
  return data.markdown
}
