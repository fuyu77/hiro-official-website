import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HomeClient from '../home-client';

const sampleTankas = [
  {
    title: '春の歌',
    source: '山の詩'
  }
];

describe('HomeClient コンポーネント', () => {
  it('最初の短歌を表示する', async () => {
    render(<HomeClient tankasData={sampleTankas} />);

    await waitFor(() => {
      expect(screen.getByText('春の歌')).toBeInTheDocument();
      expect(screen.getByText('山の詩')).toBeInTheDocument();
    });
  });
});
