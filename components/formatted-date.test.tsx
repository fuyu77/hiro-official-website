import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FormattedDate } from './formatted-date';

describe('FormattedDate', () => {
  it('日付を表示用の形式に整形する', () => {
    render(<FormattedDate dateString="2026-08-15" />);

    expect(screen.getByText('2026.08.15')).toHaveAttribute(
      'datetime',
      '2026-08-15',
    );
  });
});
