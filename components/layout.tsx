import Link from 'next/link';
import type { ReactNode } from 'react';

interface Props {
  readonly children: ReactNode;
  readonly activeTab: string;
}

export const siteTitle = '榊原紘／遠馬｜Official Website';

export default function Layout({ children, activeTab }: Props) {
  return (
    <section className="hero is-fullheight">
      <div className="hero-head">
        <header className="navbar">
          <div className="container">
            <div className="navbar-brand">
              <div className="navbar-item is-size-6">
                <Link href="/" className="has-text-dark">
                  Hiro & Tohma&apos;s Official Website
                </Link>
              </div>
            </div>
          </div>
        </header>
      </div>
      <main>{children}</main>
      <div className="hero-foot">
        <footer>
          <nav className="tabs is-boxed is-fullwidth">
            <div className="container">
              <ul>
                <li className={activeTab === 'Profile' ? 'is-active' : ''}>
                  <Link href="/profile">Profile</Link>
                </li>
                <li className={activeTab === 'News' ? 'is-active' : ''}>
                  <Link href="/news">News</Link>
                </li>
                <li className={activeTab === 'Blog' ? 'is-active' : ''}>
                  <Link href="/blog">Blog</Link>
                </li>
                <li className={activeTab === 'Contact' ? 'is-active' : ''}>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </nav>
        </footer>
      </div>
    </section>
  );
}
