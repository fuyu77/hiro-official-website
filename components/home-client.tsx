'use client';

import { useEffect, useRef, useState } from 'react';
import type { Tanka } from '../additional';
import { fadeIn, fadeOut } from '../lib/animation';
import { shuffle } from '../lib/util';
import styles from './home.module.css';

interface Props {
  readonly tankasData: Tanka[];
}

const EMPTY_TANKA: Tanka = { title: '', source: '' };

export default function HomeClient({ tankasData }: Props) {
  const tankaInput = useRef<HTMLDivElement>(null);
  const [tanka, setTanka] = useState<Tanka | null>(null);

  useEffect(() => {
    let cancelled = false;
    const isInactive = () => cancelled || tankaInput.current === null;
    const runStep = async (task: (element: HTMLDivElement) => Promise<void>) => {
      const element = tankaInput.current;
      if (cancelled || element === null) return false;
      await task(element);
      return !isInactive();
    };

    (async () => {
      if (tankasData.length === 0) return;
      const shuffledTankas = shuffle([...tankasData]);
      setTanka(shuffledTankas[0] ?? EMPTY_TANKA);

      for (const currentTanka of shuffledTankas.slice(1)) {
        const waitedBeforeFadeOut = await runStep(
          () =>
            new Promise<void>((resolve) => {
              setTimeout(resolve, 1000);
            }),
        );
        if (!waitedBeforeFadeOut) return;

        const fadedOut = await runStep((element) => fadeOut(element, 2000));
        if (!fadedOut) return;

        setTanka(currentTanka);

        const fadedIn = await runStep((element) => fadeIn(element, 2000));
        if (!fadedIn) return;

        const waitedAfterFadeIn = await runStep(
          () =>
            new Promise<void>((resolve) => {
              setTimeout(resolve, 1000);
            }),
        );
        if (!waitedAfterFadeIn) return;
      }
    })().catch(() => {
      // Nothing to do.
    });

    return () => {
      cancelled = true;
    };
  }, [tankasData]);

  const displayedTanka = tanka ?? EMPTY_TANKA;

  return (
    <div ref={tankaInput} className={`${styles.tankaWrapper} is-size-6`}>
      <div className={styles.tankaItem}>{displayedTanka.title}</div>
      <div className={styles.tankaItem}>{displayedTanka.source}</div>
    </div>
  );
}
