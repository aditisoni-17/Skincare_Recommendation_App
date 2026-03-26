import express from 'express';
import {
  createProduct,
  deleteProduct,
  getProducts,
  getRecommendedProducts,
  updateProduct,
} from '../controllers/productsController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/recommend/:id', getRecommendedProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
