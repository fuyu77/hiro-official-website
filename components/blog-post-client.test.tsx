import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import BlogPostClient from './blog-post-client';

class MockSpeechSynthesisUtterance {
  readonly text: string;

  constructor(text: string) {
    this.text = text;
  }
}

const speechSynthesisMock = {
  speaking: false,
  paused: false,
  speak: vi.fn(),
  pause: vi.fn(),
  resume: vi.fn(),
  cancel: vi.fn(),
};

describe('BlogPostClient', () => {
  beforeEach(() => {
    speechSynthesisMock.speaking = false;
    speechSynthesisMock.paused = false;
    speechSynthesisMock.speak.mockImplementation(() => {
      speechSynthesisMock.speaking = true;
    });
    speechSynthesisMock.pause.mockImplementation(() => {
      speechSynthesisMock.paused = true;
    });
    speechSynthesisMock.resume.mockImplementation(() => {
      speechSynthesisMock.paused = false;
    });
    vi.stubGlobal('speechSynthesis', speechSynthesisMock);
    vi.stubGlobal('SpeechSynthesisUtterance', MockSpeechSynthesisUtterance);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('公開記事の内容と日付を表示する', () => {
    render(
      <BlogPostClient title="記事タイトル" date="2026-08-15" isPrivate={false}>
        <p>記事本文</p>
      </BlogPostClient>,
    );

    expect(
      screen.getByRole('heading', { name: '記事タイトル' }),
    ).toBeInTheDocument();
    expect(screen.getByText('2026.08.15')).toBeInTheDocument();
    expect(screen.getByText('記事本文')).toBeInTheDocument();
  });

  it('正しいパスワードを入力すると非公開記事を表示する', () => {
    vi.stubEnv('NEXT_PUBLIC_BLOG_PASSWORD', 'secret');
    render(
      <BlogPostClient title="非公開記事" date="2026-08-15" isPrivate>
        <p>非公開本文</p>
      </BlogPostClient>,
    );

    expect(screen.queryByText('非公開本文')).not.toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('パスワード'), {
      target: { value: 'incorrect' },
    });
    expect(screen.queryByText('非公開本文')).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('パスワード'), {
      target: { value: 'secret' },
    });
    expect(screen.getByText('非公開本文')).toBeInTheDocument();
  });

  it('音読を開始、一時停止、再開できる', () => {
    render(
      <BlogPostClient title="記事タイトル" date="2026-08-15" isPrivate={false}>
        <p>読み上げる本文</p>
      </BlogPostClient>,
    );

    fireEvent.click(screen.getByRole('button', { name: '音読する' }));
    expect(speechSynthesisMock.speak).toHaveBeenCalledWith(
      expect.objectContaining({ text: '読み上げる本文' }),
    );
    expect(
      screen.getByRole('button', { name: '停止する' }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '停止する' }));
    expect(speechSynthesisMock.pause).toHaveBeenCalledOnce();
    expect(
      screen.getByRole('button', { name: '再開する' }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '再開する' }));
    expect(speechSynthesisMock.resume).toHaveBeenCalledOnce();
    expect(
      screen.getByRole('button', { name: '停止する' }),
    ).toBeInTheDocument();
  });

  it('画面を離れると音読を停止する', () => {
    const { unmount } = render(
      <BlogPostClient title="記事タイトル" date="2026-08-15" isPrivate={false}>
        <p>読み上げる本文</p>
      </BlogPostClient>,
    );
    speechSynthesisMock.speaking = true;

    unmount();

    expect(speechSynthesisMock.cancel).toHaveBeenCalledOnce();
  });
});
