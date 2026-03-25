'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { Tanka } from '../additional';
import { fadeIn, fadeOut } from '../lib/animation';
import { shuffle } from '../lib/util';
import styles from './home.module.scss';

interface Props {
  readonly tankasData: Tanka[];
}

export default function HomeClient({ tankasData }: Props) {
  const tankaInput = useRef<HTMLDivElement>(null);
  const tankas = useMemo(() => shuffle([...tankasData]), [tankasData]);
  const [currentTankaIndex, setCurrentTankaIndex] = useState(0);
  const tanka = tankas[currentTankaIndex] ?? { title: '', source: '' };

  useEffect(() => {
    (async () => {
      if (tankaInput.current === null || tankas.length === 0) return;
      for (const [index] of tankas.slice(1).entries()) {
        await new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
        await fadeOut(tankaInput.current, 2000);
        setCurrentTankaIndex(index + 1);
        await fadeIn(tankaInput.current, 2000);
        await new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
      }
    })().catch(() => {
      // Nothing to do.
    });
  }, [tankas]);

  return (
    <div ref={tankaInput} className={`${styles.tankaWrapper} is-size-6`}>
      <div className={styles.tankaItem}>{tanka.title}</div>
      <div className={styles.tankaItem}>{tanka.source}</div>
    </div>
  );
}
