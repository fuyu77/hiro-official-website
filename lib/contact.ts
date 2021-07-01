import { fetchMicroCMS } from './micro-cms'
import { serialize } from 'next-mdx-remote/serialize'
import { ContactProps } from '../additional'

interface ContactResponse {
  markdown: string
}

export const getContactData = async (): Promise<ContactProps['mdxSource']> => {
  const data: ContactResponse = await fetchMicroCMS('contact')
  return await serialize(data.markdown)
}
