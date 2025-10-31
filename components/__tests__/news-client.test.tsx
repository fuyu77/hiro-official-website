import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import NewsClient from '../news-client';

const mockYears = ['2024', '2023'];
const mockNews = {
  '2024': [
    { id: '1', date: '2024-01-05', title: 'Latest News', url: 'https://example.com/latest' }
  ],
  '2023': [
    { id: '2', date: '2023-02-10', title: 'Old News', url: 'https://example.com/old' }
  ]
};

describe('NewsClient', () => {
  it('renders current year news and switches when another year is selected', () => {
    render(<NewsClient allNewsData={mockNews} years={mockYears} />);

    expect(screen.getByRole('link', { name: 'Latest News' })).toHaveAttribute(
      'href',
      'https://example.com/latest'
    );
    expect(screen.getByText('2024').className).toContain('is-current');

    fireEvent.click(screen.getByText('2023'));

    expect(screen.getByRole('link', { name: 'Old News' })).toHaveAttribute(
      'href',
      'https://example.com/old'
    );
    expect(screen.getByText('2023').className).toContain('is-current');
    expect(screen.getByText('2024').className).not.toContain('is-current');
  });

  it('returns null when there are no years', () => {
    const { container } = render(<NewsClient allNewsData={{}} years={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
