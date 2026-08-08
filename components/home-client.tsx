'use client';

import { useEffect, useState } from 'react';
import type { Tanka } from '../additional';
import { shuffle } from '../lib/util';
import styles from './home.module.css';

interface Props {
  readonly tankasData: Tanka[];
}

const EMPTY_TANKA: Tanka = { title: '', source: '' };

export default function HomeClient({ tankasData }: Props) {
  const [tanka, setTanka] = useState<Tanka>(EMPTY_TANKA);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let isCancelled = false;

    const wait = (duration: number) =>
      new Promise<boolean>((resolve) => {
        timeoutId = setTimeout(() => resolve(!isCancelled), duration);
      });

    const switchTankas = async () => {
      if (tankasData.length === 0) return;

      const shuffledTankas = shuffle([...tankasData]);
      setTanka(shuffledTankas[0]);
      setIsVisible(true);

      for (const [index, currentTanka] of shuffledTankas.slice(1).entries()) {
        if (!(await wait(index === 0 ? 1000 : 2000))) return;

        setIsVisible(false);
        if (!(await wait(2000))) return;

        setTanka(currentTanka);
        setIsVisible(true);
      }
    };

    void switchTankas();

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [tankasData]);

  return (
    <div
      className={`${styles.tankaWrapper} ${isVisible ? styles.visible : ''} is-size-6`}
    >
      <div className={styles.tankaItem}>{tanka.title}</div>
      <div className={styles.tankaItem}>{tanka.source}</div>
    </div>
  );
}
