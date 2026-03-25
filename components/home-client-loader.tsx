'use client';

import dynamic from 'next/dynamic';
import type { Tanka } from '../additional';

const HomeClient = dynamic(async () => import('./home-client'), {
  ssr: false,
});

interface Props {
  readonly tankasData: Tanka[];
}

export default function HomeClientLoader({ tankasData }: Props) {
  return <HomeClient tankasData={tankasData} />;
}
