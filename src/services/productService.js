import { PRODUCTS } from '../data/products.js';

export async function getProducts() {
  return { products: PRODUCTS };
}
