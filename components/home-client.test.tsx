import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import HomeClient from './home-client';

vi.mock('../lib/util', () => ({
  shuffle: <T,>(items: T[]) => items,
}));

describe('HomeClient', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('短歌を順番に切り替える', async () => {
    render(
      <HomeClient
        tankasData={[
          { title: '一首目', source: '第一歌集' },
          { title: '二首目', source: '第二歌集' },
          { title: '三首目', source: '第三歌集' },
        ]}
      />,
    );

    expect(screen.getByText('一首目')).toBeInTheDocument();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(3000);
    });
    expect(screen.getByText('二首目')).toBeInTheDocument();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(5000);
    });
    expect(screen.getByText('三首目')).toBeInTheDocument();
  });

  it('短歌がない場合は空の内容を表示する', () => {
    const { container } = render(<HomeClient tankasData={[]} />);

    expect(container).toHaveTextContent('');
  });
});
