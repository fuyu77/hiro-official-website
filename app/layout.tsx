import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '../styles/global.scss';
import { siteTitle } from '../components/layout';

const description = '歌人・俳人の榊原紘／遠馬の公式サイトです。掲載情報やブログなど。';
const ogImageUrl =
  'https://hiro-tohma-official-website.com/_next/image?url=%2Fimages%2Fogp.png&w=1200&q=75';

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: `%s - ${siteTitle}`,
  },
  description,
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    siteName: siteTitle,
    title: siteTitle,
    description,
    images: [ogImageUrl],
    url: 'https://hiro-tohma-official-website.com',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
