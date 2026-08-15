import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import NewsClient from './news-client';

const allNewsData = {
  '2026': [
    {
      id: 'new-news',
      date: '2026-08-15',
      title: '新しいお知らせ',
      url: 'https://example.com/new',
    },
  ],
  '2025': [
    {
      id: 'old-news',
      date: '2025-04-01',
      title: '以前のお知らせ',
      url: 'https://example.com/old',
    },
  ],
};

describe('NewsClient', () => {
  it('最初の年のお知らせを外部リンクとして表示する', () => {
    render(<NewsClient allNewsData={allNewsData} years={['2026', '2025']} />);

    expect(screen.getByRole('button', { name: '2026' })).toHaveClass(
      'is-current',
    );
    expect(
      screen.getByRole('link', { name: '新しいお知らせ' }),
    ).toHaveAttribute('href', 'https://example.com/new');
    expect(
      screen.getByRole('link', { name: '新しいお知らせ' }),
    ).toHaveAttribute('target', '_blank');
  });

  it('選択した年のお知らせに切り替える', () => {
    render(<NewsClient allNewsData={allNewsData} years={['2026', '2025']} />);

    fireEvent.click(screen.getByRole('button', { name: '2025' }));

    expect(screen.getByRole('button', { name: '2025' })).toHaveClass(
      'is-current',
    );
    expect(screen.getByText('以前のお知らせ')).toBeInTheDocument();
    expect(screen.queryByText('新しいお知らせ')).not.toBeInTheDocument();
  });

  it('年がない場合は何も表示しない', () => {
    const { container } = render(<NewsClient allNewsData={{}} years={[]} />);

    expect(container).toBeEmptyDOMElement();
  });
});
