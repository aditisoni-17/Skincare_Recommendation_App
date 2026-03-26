import Product from '../models/Product.js';
import { PRODUCT_FIELDS, formatProduct } from '../utils/productResponse.js';

const SKIN_TYPE_RULES = {
  dry: {
    categories: ['moisturizers', 'toners', 'cleansers'],
    keywords: ['hydrating', 'moisture', 'moisturizing', 'cream', 'nourish', 'barrier', 'gentle'],
  },
  oily: {
    categories: ['cleansers', 'serums', 'toners'],
    keywords: ['oil', 'oily', 'pore', 'salicylic', 'niacinamide', 'gel', 'lightweight'],
  },
  combination: {
    categories: ['cleansers', 'serums', 'moisturizers', 'toners'],
    keywords: ['balance', 'balanced', 'hydrating', 'lightweight', 'niacinamide', 'gentle'],
  },
  sensitive: {
    categories: ['cleansers', 'moisturizers', 'toners'],
    keywords: ['gentle', 'hydrating', 'barrier', 'calming', 'soothing', 'lightweight'],
  },
};

const CONCERN_RULES = {
  acne: {
    categories: ['cleansers', 'serums'],
    keywords: ['acne', 'breakout', 'salicylic', 'pore', 'oil', 'niacinamide'],
  },
  dryness: {
    categories: ['moisturizers', 'toners', 'cleansers'],
    keywords: ['hydrating', 'moisture', 'moisturizing', 'nourish', 'cream', 'barrier'],
  },
  aging: {
    categories: ['serums', 'moisturizers'],
    keywords: ['retinol', 'anti-aging', 'aging', 'vitamin c', 'firming', 'night cream'],
  },
  dullness: {
    categories: ['serums', 'sunscreen'],
    keywords: ['brightening', 'radiant', 'even-toned', 'vitamin c', 'glow'],
  },
  redness: {
    categories: ['cleansers', 'moisturizers', 'toners'],
    keywords: ['gentle', 'calming', 'soothing', 'hydrating', 'barrier'],
  },
};

function normalizeValue(value) {
  return String(value || '').trim().toLowerCase();
}

function buildProfileRules(skinType, concern) {
  const skinRules = SKIN_TYPE_RULES[skinType] || { categories: [], keywords: [] };
  const concernRules = CONCERN_RULES[concern] || { categories: [], keywords: [] };

  return {
    categories: [...new Set([...skinRules.categories, ...concernRules.categories])],
    keywords: [...new Set([...skinRules.keywords, ...concernRules.keywords, skinType, concern])],
  };
}

function scoreProduct(product, rules) {
  const category = normalizeValue(product.category);
  const description = normalizeValue(product.description);
  const name = normalizeValue(product.name);
  let score = 0;

  if (rules.categories.includes(category)) {
    score += 3;
  }

  for (const keyword of rules.keywords) {
    if (description.includes(keyword)) {
      score += 2;
    }

    if (name.includes(keyword)) {
      score += 1;
    }

    if (category.includes(keyword)) {
      score += 1;
    }
  }

  score += Number(product.rating || 0) / 10;
  return score;
}

export async function recommendProducts(req, res) {
  const skinType = normalizeValue(req.body?.skinType);
  const concern = normalizeValue(req.body?.concern);

  if (!skinType || !concern) {
    return res.status(400).json({ error: 'skinType and concern are required' });
  }

  try {
    const products = await Product.find({}, PRODUCT_FIELDS.join(' ')).lean();
    const rules = buildProfileRules(skinType, concern);

    let recommendations = products
      .map((product) => ({ product, score: scoreProduct(product, rules) }))
      .filter(({ score }) => score > 0)
      .sort(
        (a, b) =>
          b.score - a.score ||
          Number(b.product.rating || 0) - Number(a.product.rating || 0) ||
          a.product.id - b.product.id
      )
      .slice(0, 4)
      .map(({ product }) => formatProduct(product));

    if (recommendations.length === 0) {
      recommendations = products
        .sort(
          (a, b) =>
            Number(b.rating || 0) - Number(a.rating || 0) ||
            Number(b.reviewCount || 0) - Number(a.reviewCount || 0) ||
            a.id - b.id
        )
        .slice(0, 4)
        .map((product) => formatProduct(product));
    }

    return res.json({
      products: recommendations,
      profile: { skinType, concern },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Recommendation API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
