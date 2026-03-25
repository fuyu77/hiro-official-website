'use client';

import { useEffect, useRef, useState } from 'react';
import type { Tanka } from '../additional';
import { fadeIn, fadeOut } from '../lib/animation';
import { shuffle } from '../lib/util';
import styles from './home.module.scss';

interface Props {
  readonly tankasData: Tanka[];
}

const EMPTY_TANKA: Tanka = { title: '', source: '' };

export default function HomeClient({ tankasData }: Props) {
  const tankaInput = useRef<HTMLDivElement>(null);
  const [tanka, setTanka] = useState<Tanka | null>(null);

  useEffect(() => {
    (async () => {
      if (tankaInput.current === null || tankasData.length === 0) return;
      const shuffledTankas = shuffle([...tankasData]);
      setTanka(shuffledTankas[0] ?? EMPTY_TANKA);

      for (const currentTanka of shuffledTankas.slice(1)) {
        await new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
        await fadeOut(tankaInput.current, 2000);
        setTanka(currentTanka);
        await fadeIn(tankaInput.current, 2000);
        await new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
      }
    })().catch(() => {
      // Nothing to do.
    });
  }, [tankasData]);

  const displayedTanka = tanka ?? EMPTY_TANKA;

  return (
    <div ref={tankaInput} className={`${styles.tankaWrapper} is-size-6`}>
      <div className={styles.tankaItem}>{displayedTanka.title}</div>
      <div className={styles.tankaItem}>{displayedTanka.source}</div>
    </div>
  );
}
