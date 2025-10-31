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

describe('InlineItem コンポーネント', () => {
  it('デフォルトで half クラスを適用する', () => {
    render(
      <InlineItem>
        <span>Content</span>
      </InlineItem>
    );

    const element = screen.getByText('Content').parentElement;
    expect(element).toHaveClass('half-class');
  });

  it('itemWidth=\"full\" のとき full クラスを適用する', () => {
    render(
      <InlineItem itemWidth="full">
        <span>Full</span>
      </InlineItem>
    );

    const element = screen.getByText('Full').parentElement;
    expect(element).toHaveClass('full-class');
  });
});

describe('InlineWrapper コンポーネント', () => {
  it('子要素を wrapper クラスで囲む', () => {
    render(
      <InlineWrapper>
        <div>Wrapped</div>
      </InlineWrapper>
    );

    expect(screen.getByText('Wrapped').parentElement).toHaveClass('wrapper-class');
  });
});
