import Head from 'next/head'
import Link from 'next/link'
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import { getSortedPostsData } from '../lib/posts'
import { GetStaticProps } from 'next'

export default function Home ({
  allPostsData
}: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) {
  return (
    <Layout activeTab="Blog">
      <Head>
        <title>{`Blog - ${siteTitle}`}</title>
      </Head>
      <div className="hero-body">
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

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
