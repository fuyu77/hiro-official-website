import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Pdf from '../pdf';

describe('Pdf コンポーネント', () => {
  it('PDF を表示する iframe とフォールバックリンクを描画する', () => {
    render(<Pdf url="https://example.com/document.pdf" />);

    const iframe = screen.getByTitle('PDF document');
    expect(iframe).toHaveAttribute('src', 'https://example.com/document.pdf');

    const link = screen.getByRole('link', { name: 'こちら' });
    expect(link).toHaveAttribute('href', 'https://example.com/document.pdf');
  });
});
