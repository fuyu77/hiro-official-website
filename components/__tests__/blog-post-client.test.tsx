import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import BlogPostClient from '../blog-post-client';

declare global {
  // eslint-disable-next-line no-var
  var SpeechSynthesisUtterance: new (text: string) => SpeechSynthesisUtterance;
}

beforeEach(() => {
  vi.clearAllMocks();
  process.env.NEXT_PUBLIC_BLOG_PASSWORD = 'secret';

  const speechSynthesisMock = {
    speaking: false,
    paused: false,
    cancel: vi.fn(function (this: SpeechSynthesis) {
      this.speaking = false;
      this.paused = false;
    }),
    speak: vi.fn(function (this: SpeechSynthesis) {
      this.speaking = true;
      this.paused = false;
    }),
    pause: vi.fn(function (this: SpeechSynthesis) {
      this.paused = true;
      this.speaking = false;
    }),
    resume: vi.fn(function (this: SpeechSynthesis) {
      this.paused = false;
      this.speaking = true;
    })
  } as unknown as SpeechSynthesis;

  Object.defineProperty(globalThis, 'speechSynthesis', {
    configurable: true,
    value: speechSynthesisMock,
    writable: true
  });

  globalThis.SpeechSynthesisUtterance = function (this: SpeechSynthesisUtterance, text: string) {
    this.text = text;
  } as unknown as new (text: string) => SpeechSynthesisUtterance;
});

describe('BlogPostClient', () => {
  it('renders password form when the post is private', () => {
    render(
      <BlogPostClient title="Private Post" date="2024-01-01" isPrivate>
        <p>Secret content</p>
      </BlogPostClient>
    );

    expect(screen.getByText('パスワード')).toBeInTheDocument();
  });

  it('unlocks the post after entering the correct password', () => {
    render(
      <BlogPostClient title="Private Post" date="2024-01-01" isPrivate>
        <p>Secret content</p>
      </BlogPostClient>
    );

    const [passwordInput] = screen.getAllByPlaceholderText('入力してください');

    fireEvent.change(passwordInput, {
      target: { value: 'secret' }
    });

    expect(screen.getByRole('heading', { name: 'Private Post' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '音読する' })).toBeInTheDocument();
  });

  it('speaks the post body when the speak button is clicked', () => {
    render(
      <BlogPostClient title="Public Post" date="2024-01-01" isPrivate={false}>
        <p>Post content</p>
      </BlogPostClient>
    );

    const speakButtons = screen.getAllByRole('button', { name: '音読する' });
    fireEvent.click(speakButtons[0]);

    expect(globalThis.speechSynthesis.speak).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: '停止する' })).toBeInTheDocument();
  });
});
