import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Layout from '../layout';

describe('Layout コンポーネント', () => {
  it('子要素を表示しアクティブなタブをハイライトする', () => {
    render(
      <Layout activeTab="Blog">
        <div>Child content</div>
      </Layout>
    );

    expect(screen.getByText('Child content')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Blog' }).closest('li')).toHaveClass('is-active');
    expect(screen.getByRole('link', { name: 'Profile' }).closest('li')).not.toHaveClass('is-active');
  });
});
