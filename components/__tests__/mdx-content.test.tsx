import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MDXRemote } from 'next-mdx-remote/rsc';
import MdxContent from '../mdx-content';

describe('MdxContent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the MDXRemote component with provided props', () => {
    const source = { compiledSource: '<p>Example</p>' };
    const components = { p: (props: { children: ReactNode }) => <p {...props} /> };

    render(<MdxContent source={source} components={components} />);

    expect(screen.getByTestId('mdx-remote')).toBeInTheDocument();
    const callArgs = vi.mocked(MDXRemote).mock.calls[0];
    expect(callArgs?.[0]).toMatchObject({ source, components });
  });
});
