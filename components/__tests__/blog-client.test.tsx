import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import BlogClient from '../blog-client';

const mockYears = ['2024', '2023'];
const mockPosts = {
  '2024': [
    { id: '1', date: '2024-01-02', title: 'First Post' },
    { id: '2', date: '2024-02-03', title: 'Second Post' }
  ],
  '2023': [{ id: '3', date: '2023-03-04', title: 'Older Post' }]
};

describe('BlogClient コンポーネント', () => {
  it('選択した年の記事を表示し、年を切り替えられる', () => {
    render(<BlogClient allPostsData={mockPosts} years={mockYears} />);

    expect(screen.getByRole('link', { name: 'First Post' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Second Post' })).toBeInTheDocument();
    expect(screen.getByText('2024').className).toContain('is-current');

    fireEvent.click(screen.getByText('2023'));

    expect(screen.getByRole('link', { name: 'Older Post' })).toBeInTheDocument();
    expect(screen.getByText('2023').className).toContain('is-current');
    expect(screen.getByText('2024').className).not.toContain('is-current');
  });

  it('年が指定されない場合は null を返す', () => {
    const { container } = render(<BlogClient allPostsData={{}} years={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
