import remark from 'remark'
import html from 'remark-html'

interface ContactResponse {
  markdown: string;
}

export const getProfileData = async () => {
  const data: ContactResponse = await fetch(
    'https://hiro-official-website.microcms.io/api/v1/profile',
    { headers: { 'X-API-KEY': process.env.MICROCMS_API_KEY as string } }
  )
    .then(response => response.json())
  const processedContent = await remark()
    .use(html)
    .process(data.markdown)
  const contentHtml = processedContent.toString()
  return contentHtml
}
