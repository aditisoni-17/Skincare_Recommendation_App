export const PRODUCT_FIELDS = [
  'id',
  'name',
  'price',
  'rating',
  'reviewCount',
  'image',
  'description',
  'category',
  'isNew',
  'isSale',
];

export function formatProduct(product) {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    rating: product.rating,
    reviewCount: product.reviewCount,
    image: product.image,
    description: product.description,
    category: product.category,
    isNew: product.isNew,
    isSale: product.isSale,
  };
}
