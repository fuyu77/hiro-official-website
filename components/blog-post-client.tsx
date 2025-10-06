'use client';

import { useEffect, useRef, useState } from 'react';
import type { Post } from '../additional';
import { Date } from './date';
import MdxContent from './mdx-content';
import Image from './image';
import Pdf from './pdf';
import InlineWrapper from './inline-wrapper';
import InlineItem from './inline-item';

const components = {
  Image,
  Pdf,
  InlineWrapper,
  InlineItem,
};

interface Props {
  readonly postData: Post;
}

export default function BlogPostClient({ postData }: Props) {
  const [verified, setVerified] = useState<boolean>(!postData.private);
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
            <Date dateString={postData.date} />
            <h1>{postData.title}</h1>
            <div>
              <button type="button" className="button" onClick={speak}>
                {speechButtonText}
              </button>
              <div ref={body}>
                <div />
                <MdxContent mdxSource={postData.mdxSource} components={components} />
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
