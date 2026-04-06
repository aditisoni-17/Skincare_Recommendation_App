import { formatProduct } from '../../../server/utils/productResponse.js';

describe('formatProduct', () => {
  it('returns only the product fields used by the API response', () => {
    const product = {
      id: 1,
      name: 'Hydrating Cleanser',
      price: 24.99,
      rating: 4.8,
      reviewCount: 128,
      image: 'https://example.com/image.jpg',
      description: 'Gentle cleanser',
      category: 'cleansers',
      isNew: true,
      isSale: false,
      internalNotes: 'should not be exposed',
    };

    expect(formatProduct(product)).toEqual({
      id: 1,
      name: 'Hydrating Cleanser',
      price: 24.99,
      rating: 4.8,
      reviewCount: 128,
      image: 'https://example.com/image.jpg',
      description: 'Gentle cleanser',
      category: 'cleansers',
      isNew: true,
      isSale: false,
    });
  });
});
