import Product from '../models/Product.js';
import { PRODUCT_FIELDS, formatProduct } from '../utils/productResponse.js';

function parseProductId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function normalizeText(value) {
  return String(value || '').trim();
}

function normalizeCategory(value) {
  return normalizeText(value).toLowerCase();
}

function isValidImageUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function parsePositiveInteger(value, fallback) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function validateProductPayload(payload, { partial = false } = {}) {
  const errors = [];
  const updates = {};

  if (!partial || Object.prototype.hasOwnProperty.call(payload, 'id')) {
    const id = Number(payload.id);
    if (!Number.isInteger(id) || id <= 0) {
      errors.push('id must be a positive integer');
    } else {
      updates.id = id;
    }
  }

  if (!partial || Object.prototype.hasOwnProperty.call(payload, 'name')) {
    const name = normalizeText(payload.name);
    if (!name) {
      errors.push('name is required');
    } else {
      updates.name = name;
    }
  }

  if (!partial || Object.prototype.hasOwnProperty.call(payload, 'price')) {
    const price = Number(payload.price);
    if (!Number.isFinite(price) || price <= 0) {
      errors.push('price must be greater than 0');
    } else {
      updates.price = price;
    }
  }

  if (Object.prototype.hasOwnProperty.call(payload, 'rating')) {
    const rating = Number(payload.rating);
    if (!Number.isFinite(rating) || rating < 0 || rating > 5) {
      errors.push('rating must be between 0 and 5');
    } else {
      updates.rating = rating;
    }
  }

  if (Object.prototype.hasOwnProperty.call(payload, 'reviewCount')) {
    const reviewCount = Number(payload.reviewCount);
    if (!Number.isInteger(reviewCount) || reviewCount < 0) {
      errors.push('reviewCount must be a non-negative integer');
    } else {
      updates.reviewCount = reviewCount;
    }
  }

  if (!partial || Object.prototype.hasOwnProperty.call(payload, 'image')) {
    const image = normalizeText(payload.image);
    if (!image) {
      errors.push('image is required');
    } else if (!isValidImageUrl(image)) {
      errors.push('image must be a valid URL');
    } else {
      updates.image = image;
    }
  }

  if (!partial || Object.prototype.hasOwnProperty.call(payload, 'description')) {
    const description = normalizeText(payload.description);
    if (!description) {
      errors.push('description is required');
    } else {
      updates.description = description;
    }
  }

  if (!partial || Object.prototype.hasOwnProperty.call(payload, 'category')) {
    const category = normalizeCategory(payload.category);
    if (!category) {
      errors.push('category is required');
    } else {
      updates.category = category;
    }
  }

  for (const field of ['isNew', 'isSale']) {
    if (Object.prototype.hasOwnProperty.call(payload, field)) {
      if (typeof payload[field] !== 'boolean') {
        errors.push(`${field} must be a boolean`);
      } else {
        updates[field] = payload[field];
      }
    }
  }

  return { errors, updates };
}

function handleDatabaseError(res, error) {
  if (error?.code === 11000) {
    return res.status(409).json({ error: 'Product with this id already exists' });
  }

  // eslint-disable-next-line no-console
  console.error('Products API error:', error);
  return res.status(500).json({ error: 'Internal server error' });
}

export async function getProducts(req, res) {
  const page = parsePositiveInteger(req.query.page, 1);
  const limit = Math.min(parsePositiveInteger(req.query.limit, 12), 50);
  const search = normalizeText(req.query.search).toLowerCase();
  const category = normalizeCategory(req.query.category);
  const filter = {};

  if (category && category !== 'all') {
    filter.category = category;
  }

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { category: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  try {
    const [products, total] = await Promise.all([
      Product.find(filter, PRODUCT_FIELDS.join(' '))
        .sort({ id: 1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Product.countDocuments(filter),
    ]);

    return res.json({
      products: products.map(formatProduct),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    });
  } catch (error) {
    return handleDatabaseError(res, error);
  }
}

export async function getRecommendedProducts(req, res) {
  const productId = parseProductId(req.params.id);
  if (!productId) {
    return res.status(400).json({ error: 'Invalid product id' });
  }

  try {
    const product = await Product.findOne({ id: productId }, PRODUCT_FIELDS.join(' ')).lean();

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const recommendations = await Product.find(
      {
        category: product.category,
        id: { $ne: productId },
      },
      PRODUCT_FIELDS.join(' ')
    )
      .sort({ rating: -1, reviewCount: -1, id: 1 })
      .limit(4)
      .lean();

    return res.json({ products: recommendations.map(formatProduct) });
  } catch (error) {
    return handleDatabaseError(res, error);
  }
}

export async function createProduct(req, res) {
  const { errors, updates } = validateProductPayload(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(', ') });
  }

  try {
    const product = await Product.create(updates);
    return res.status(201).json({ product: formatProduct(product) });
  } catch (error) {
    return handleDatabaseError(res, error);
  }
}

export async function updateProduct(req, res) {
  const productId = parseProductId(req.params.id);
  if (!productId) {
    return res.status(400).json({ error: 'Invalid product id' });
  }

  if (Object.keys(req.body || {}).length === 0) {
    return res.status(400).json({ error: 'Request body cannot be empty' });
  }

  if (
    Object.prototype.hasOwnProperty.call(req.body, 'id') &&
    parseProductId(req.body.id) !== productId
  ) {
    return res.status(400).json({ error: 'Body id must match route id' });
  }

  const { errors, updates } = validateProductPayload(
    { ...req.body, id: productId },
    { partial: true }
  );

  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(', ') });
  }

  try {
    const product = await Product.findOneAndUpdate(
      { id: productId },
      { $set: updates },
      { new: true, runValidators: true, projection: PRODUCT_FIELDS.join(' ') }
    ).lean();

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.json({ product: formatProduct(product) });
  } catch (error) {
    return handleDatabaseError(res, error);
  }
}

export async function deleteProduct(req, res) {
  const productId = parseProductId(req.params.id);
  if (!productId) {
    return res.status(400).json({ error: 'Invalid product id' });
  }

  try {
    const product = await Product.findOneAndDelete({ id: productId }, PRODUCT_FIELDS.join(' ')).lean();

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.json({
      message: 'Product deleted successfully',
      product: formatProduct(product),
    });
  } catch (error) {
    return handleDatabaseError(res, error);
  }
}
