'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { BlogProps } from '../additional';
import { Date } from './date';

export default function BlogClient({ allPostsData, years }: BlogProps) {
  const [currentYear, setCurrentYear] = useState<string>(years[0] ?? '');

  if (years.length === 0) {
    return null;
  }

  return (
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
          {allPostsData[currentYear]?.map(({ id, date, title }) => (
            <li key={id} className="mb-2">
              <small>
                <Date dateString={date} />
              </small>
              <br />
              <Link
                href={`/blog/${id}`}
                className="has-text-weight-semibold is-size-5 has-text-dark"
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
