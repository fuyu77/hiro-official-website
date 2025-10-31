import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Image from '../image';

describe('Image コンポーネント', () => {
  it('渡された props を用いて画像を表示する', () => {
    render(<Image src="/photo.jpg" alt="Sample" width={100} height={100} />);

    const img = screen.getByRole('img', { name: 'Sample' });
    expect(img).toHaveAttribute('src', '/photo.jpg');
    expect(img).toHaveAttribute('alt', 'Sample');
  });
});
