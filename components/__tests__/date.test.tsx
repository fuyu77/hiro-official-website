import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Date } from '../date';

describe('Date コンポーネント', () => {
  it('日付文字列をフォーマットして表示する', () => {
    render(<Date dateString="2024-05-01" />);

    const time = screen.getByText('2024.05.01');
    expect(time.tagName).toBe('TIME');
    expect(time).toHaveAttribute('dateTime', '2024-05-01');
  });
});
