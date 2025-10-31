import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Layout from '../layout';

describe('Layout', () => {
  it('renders children and highlights active tab', () => {
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
