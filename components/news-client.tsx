'use client';

import { useState } from 'react';
import type { NewsProps } from '../additional';
import { Date } from './date';

export default function NewsClient({ allNewsData, years }: NewsProps) {
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
          {allNewsData[currentYear]?.map(({ id, date, title, url }) => (
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
  );
}
