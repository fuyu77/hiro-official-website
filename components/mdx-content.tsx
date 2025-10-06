import type { ComponentProps } from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';

interface Props {
  readonly source: ComponentProps<typeof MDXRemote>['source'];
  readonly components?: ComponentProps<typeof MDXRemote>['components'];
}

export default function MdxContent({ source, components }: Props) {
  return <MDXRemote source={source} components={components} />;
}
