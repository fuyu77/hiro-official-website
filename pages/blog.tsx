import Head from 'next/head'
import Link from 'next/link'
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import { getSortedPostsData } from '../lib/blog'
import { GetStaticProps } from 'next'

interface Props {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}

const Blog: React.FC<Props> = ({ allPostsData }) => {
  return (
    <Layout activeTab="Blog">
      <Head>
        <title>{`Blog - ${siteTitle}`}</title>
        <meta name="og:title" content={`Blog - ${siteTitle}`} />
      </Head>
      <div className="hero-body container">
        <section>
          <ul>
            {allPostsData.map(({ id, date, title }) => (
              <li key={id} className="mb-2">
                <small>
                  <Date dateString={date} />
                </small>
                <br />
                <Link href={`/blog/${id}`}>
                  <a className="has-text-weight-semibold is-size-5 has-text-dark">{title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allPostsData = await getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default Blog
