'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { BlogProps } from '../additional';
import { FormattedDate } from './formatted-date';

export default function BlogClient({ allPostsData, years }: BlogProps) {
  const [currentYear, setCurrentYear] = useState<string>(years[0] ?? '');

  if (years.length === 0) {
    return null;
  }

  return (
    <div className="hero-body container is-max-desktop">
      <section>
        <nav className="pagination mb-2">
          <ul className="pagination-list">
            {years.map((year) => (
              <li key={year}>
                <button
                  type="button"
                  className={`pagination-link ${currentYear === year ? 'is-current' : ''}`}
                  onClick={() => {
                    setCurrentYear(year);
                  }}
                >
                  {year}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <ul>
          {allPostsData[currentYear]?.map(({ id, date, title }) => (
            <li key={id} className="mb-2">
              <small>
                <FormattedDate dateString={date} />
              </small>
              <br />
              <Link
                href={`/blog/${id}`}
                className="has-text-weight-semibold is-size-5 has-text-body"
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
