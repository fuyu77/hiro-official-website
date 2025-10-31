import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('../inline-item.module.scss', () => ({
  __esModule: true,
  default: { full: 'full-class', half: 'half-class' }
}));

vi.mock('../inline-wrapper.module.scss', () => ({
  __esModule: true,
  default: { wrapper: 'wrapper-class' }
}));

import InlineItem from '../inline-item';
import InlineWrapper from '../inline-wrapper';

describe('InlineItem', () => {
  it('applies the half class by default', () => {
    render(
      <InlineItem>
        <span>Content</span>
      </InlineItem>
    );

    const element = screen.getByText('Content').parentElement;
    expect(element).toHaveClass('half-class');
  });

  it('applies the full class when specified', () => {
    render(
      <InlineItem itemWidth="full">
        <span>Full</span>
      </InlineItem>
    );

    const element = screen.getByText('Full').parentElement;
    expect(element).toHaveClass('full-class');
  });
});

describe('InlineWrapper', () => {
  it('wraps children with the wrapper class', () => {
    render(
      <InlineWrapper>
        <div>Wrapped</div>
      </InlineWrapper>
    );

    expect(screen.getByText('Wrapped').parentElement).toHaveClass('wrapper-class');
  });
});
