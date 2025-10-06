'use client';

import type { ComponentProps } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

interface Props {
  readonly mdxSource: MDXRemoteSerializeResult;
  readonly components?: ComponentProps<typeof MDXRemote>['components'];
}

export default function MdxContent({ mdxSource, components }: Props) {
  return <MDXRemote {...mdxSource} components={components} />;
}
