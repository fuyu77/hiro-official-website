import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import BlogClient from './blog-client';

const allPostsData = {
  '2026': [{ id: 'new-post', date: '2026-08-15', title: '新しい記事' }],
  '2025': [{ id: 'old-post', date: '2025-04-01', title: '以前の記事' }],
};

describe('BlogClient', () => {
  it('最初の年の記事を表示する', () => {
    render(<BlogClient allPostsData={allPostsData} years={['2026', '2025']} />);

    expect(screen.getByRole('button', { name: '2026' })).toHaveClass(
      'is-current',
    );
    expect(screen.getByRole('link', { name: '新しい記事' })).toHaveAttribute(
      'href',
      '/blog/new-post',
    );
    expect(screen.getByText('2026.08.15')).toBeInTheDocument();
  });

  it('選択した年の記事に切り替える', () => {
    render(<BlogClient allPostsData={allPostsData} years={['2026', '2025']} />);

    fireEvent.click(screen.getByRole('button', { name: '2025' }));

    expect(screen.getByRole('button', { name: '2025' })).toHaveClass(
      'is-current',
    );
    expect(screen.getByRole('link', { name: '以前の記事' })).toHaveAttribute(
      'href',
      '/blog/old-post',
    );
    expect(screen.queryByText('新しい記事')).not.toBeInTheDocument();
  });

  it('年がない場合は何も表示しない', () => {
    const { container } = render(<BlogClient allPostsData={{}} years={[]} />);

    expect(container).toBeEmptyDOMElement();
  });
});
