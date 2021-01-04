interface ContactResponse {
  markdown: string
}

export const getContactData = async () => {
  const data: ContactResponse = await fetch(
    'https://hiro-official-website.microcms.io/api/v1/contact',
    { headers: { 'X-API-KEY': process.env.MICROCMS_API_KEY as string } }
  )
    .then(response => response.json())
  return data.markdown
}
