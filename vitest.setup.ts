import '@testing-library/jest-dom/vitest';
import React from 'react';
import { vi } from 'vitest';

(globalThis as unknown as { React: typeof React }).React = React;

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) => React.createElement('a', { href, ...props }, children)
}));

vi.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    ...props
  }: {
    src: string | { src: string };
    alt: string;
  }) => {
    const resolvedSrc = typeof src === 'string' ? src : src.src;
    return React.createElement('img', { src: resolvedSrc, alt, ...props });
  }
}));

const mdxRemoteMock = vi.fn(
  ({ children }: { children?: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'mdx-remote' }, children)
);

vi.mock('next-mdx-remote/rsc', () => ({
  MDXRemote: mdxRemoteMock
}));
