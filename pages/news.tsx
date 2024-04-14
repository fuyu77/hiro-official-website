import Head from 'next/head';
import { useState } from 'react';
import { Date } from '../components/date';
import Layout, { siteTitle } from '../components/layout';
import { getSortedNewsData } from '../lib/news';
import type { GetStaticProps } from 'next';
import type { NewsProps } from '../additional';

export default function News({ allNewsData, years }: NewsProps) {
  const [currentYear, setCurrentYear] = useState<string>(years[0]);

  return (
    <Layout activeTab="News">
      <Head>
        <title>{`News - ${siteTitle}`}</title>
        <meta name="og:title" content={`News - ${siteTitle}`} />
      </Head>
      <div className="hero-body container is-block">
        <section>
          <nav className="pagination mb-2" role="navigation">
            <ul className="pagination-list">
              {years.map((year) => (
                <div
                  key={year}
                  className={`pagination-link ${currentYear === year ? 'is-current' : ''}`}
                  onClick={() => {
                    setCurrentYear(year);
                  }}
                >
                  {year}
                </div>
              ))}
            </ul>
          </nav>
          <ul>
            {allNewsData[currentYear].map(({ id, date, title, url }) => (
              <li key={id} className="mb-2">
                <small>
                  <Date dateString={date} />
                </small>
                <br />
                <a
                  className="has-text-weight-semibold is-size-5 has-text-dark"
                  href={url}
                  rel="noreferrer"
                  target="_blank"
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<NewsProps> = async () => {
  const allNewsData = await getSortedNewsData();
  return {
    props: {
      allNewsData,
      years: Object.keys(allNewsData).sort((a, b) => {
        if (a < b) {
          return 1;
        }

        return -1;
      }),
    },
  };
};
