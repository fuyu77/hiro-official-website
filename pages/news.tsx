import Head from 'next/head'
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import { getSortedNewsData } from '../lib/news'
import { GetStaticProps } from 'next'
import { NewsProps } from '../additional'

const News: React.FC<NewsProps> = ({ allNewsData }) => {
  return (
    <Layout activeTab='News'>
      <Head>
        <title>{`News - ${siteTitle}`}</title>
        <meta name='og:title' content={`News - ${siteTitle}`} />
      </Head>
      <div className='hero-body container'>
        <section>
          <ul>
            {allNewsData.map(({ id, date, title, url }) => (
              <li key={id} className='mb-2'>
                <small>
                  <Date dateString={date} />
                </small>
                <br />
                <a className='has-text-weight-semibold is-size-5 has-text-dark' href={url}>
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<NewsProps> = async () => {
  const allNewsData = await getSortedNewsData()
  return {
    props: {
      allNewsData
    }
  }
}

export default News
