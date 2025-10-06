'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Date } from './date';

interface Props {
  readonly title: string;
  readonly date: string;
  readonly isPrivate: boolean;
  readonly children: ReactNode;
}

export default function BlogPostClient({ title, date, isPrivate, children }: Props) {
  const [verified, setVerified] = useState<boolean>(!isPrivate);
  const [speechButtonText, setSpeechButtonText] = useState<string>('音読する');
  const body = useRef<HTMLDivElement>(null);

  useEffect(
    () => () => {
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
    },
    []
  );

  const changePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value === process.env.NEXT_PUBLIC_BLOG_PASSWORD) {
      setVerified(true);
    }
  };

  const speak: React.MouseEventHandler<HTMLButtonElement> = () => {
    const text = body.current?.textContent;
    if (!text) {
      return;
    }

    if (!speechSynthesis.speaking) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
      setSpeechButtonText('停止する');
    } else if (speechSynthesis.paused) {
      speechSynthesis.resume();
      setSpeechButtonText('停止する');
    } else {
      speechSynthesis.pause();
      setSpeechButtonText('再開する');
    }
  };

  return (
    <div className="hero-body container is-max-desktop">
      <article className="content">
        {verified ? (
          <div>
            <Date dateString={date} />
            <h1>{title}</h1>
            <div>
              <button type="button" className="button" onClick={speak}>
                {speechButtonText}
              </button>
              <div ref={body}>
                <div />
                {children}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <label className="label">パスワード</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="入力してください"
                onChange={changePassword}
              />
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
