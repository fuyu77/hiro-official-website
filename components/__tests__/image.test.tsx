import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Image from '../image';

describe('Image', () => {
  it('renders an image element with forwarded props', () => {
    render(<Image src="/photo.jpg" alt="Sample" width={100} height={100} />);

    const img = screen.getByRole('img', { name: 'Sample' });
    expect(img).toHaveAttribute('src', '/photo.jpg');
    expect(img).toHaveAttribute('alt', 'Sample');
  });
});
