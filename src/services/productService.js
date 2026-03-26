export const PRODUCTS = [
  {
    id: 1,
    name: 'Hydrating Cleanser',
    price: 24.99,
    rating: 4.8,
    reviewCount: 128,
    image:
      'https://www.drsheths.com/cdn/shop/files/1000x1000.jpg?v=1686288581',
    description:
      "Gentle cleanser that removes impurities while maintaining skin's moisture barrier.",
    category: 'cleansers',
    isNew: true,
    isSale: false,
  },
  {
    id: 2,
    name: 'Vitamin C Serum',
    price: 39.99,
    rating: 4.9,
    reviewCount: 256,
    image:
      'https://www.thirty7.com.au/cdn/shop/files/Screenshot2024-10-10at10.39.19AM.png?v=1728528003',
    description: 'Brightening serum with 20% vitamin C for radiant, even-toned skin.',
    category: 'serums',
    isNew: false,
    isSale: true,
  },
  {
    id: 3,
    name: 'Moisturizing Cream',
    price: 29.99,
    rating: 4.7,
    reviewCount: 89,
    image:
      'https://plumgoodness.com/cdn/shop/files/01_92665dbf-af1f-467c-961f-6ecd086dc890.webp?v=1745572197&width=1214',
    description: 'Rich cream that deeply hydrates and nourishes dry skin.',
    category: 'moisturizers',
    isNew: false,
    isSale: false,
  },
  {
    id: 4,
    name: 'Sunscreen SPF 50',
    price: 34.99,
    rating: 4.6,
    reviewCount: 167,
    image:
      'https://www.dotandkey.com/cdn/shop/files/1_b5e80933-09d0-4291-b626-c7414ad64230.jpg?v=1773049792',
    description: 'Broad-spectrum protection with a lightweight, non-greasy formula.',
    category: 'sunscreen',
    isNew: true,
    isSale: false,
  },
  {
    id: 5,
    name: 'Retinol Night Cream',
    price: 49.99,
    rating: 4.5,
    reviewCount: 92,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxN5KeJJIRoGSFvefoGZ2kpq5SZ0saJaQcGA&s',
    description:
      'Anti-aging cream with encapsulated retinol for gentle yet effective results.',
    category: 'moisturizers',
    isNew: false,
    isSale: true,
  },
  {
    id: 6,
    name: 'Clay Mask',
    price: 27.99,
    rating: 4.8,
    reviewCount: 143,
    image:
      'https://clayco.in/cdn/shop/files/headder_banner.png?v=1737373473&width=650',
    description: 'Purifying mask that draws out impurities and refines pores.',
    category: 'masks',
    isNew: false,
    isSale: false,
  },
  {
    id: 7,
    name: 'Niacinamide Serum',
    price: 32.99,
    rating: 4.7,
    reviewCount: 180,
    image:
      'https://rukmini1.flixcart.com/image/1500/1500/xif0q/skin-treatment/3/q/h/20-5-niacinamide-2-alpha-arbutin-clearing-serum-4-in-1-original-imahktmmbgbvsgff.jpeg?q=70',
    description: 'Controls oil and minimizes pores.',
    category: 'serums',
    isNew: false,
    isSale: false,
  },
  {
    id: 8,
    name: 'Salicylic Acid Cleanser',
    price: 26.99,
    rating: 4.6,
    reviewCount: 140,
    image:
      'https://www.boozyshop.com/cdn/shop/products/boozyshop-salicylic-acid-cleanser-36755530187028.jpg?v=1731344185',
    description: 'Deep cleans pores and reduces acne.',
    category: 'cleansers',
    isNew: false,
    isSale: true,
  },
  {
    id: 9,
    name: 'Hydrating Toner',
    price: 22.99,
    rating: 4.5,
    reviewCount: 110,
    image:
      'https://beminimalist.co/cdn/shop/files/Listing_NMFToner_5.jpg?v=1765258840&width=1100',
    description: 'Balances skin and adds hydration.',
    category: 'toners',
    isNew: true,
    isSale: false,
  },
  {
    id: 10,
    name: 'Face Mist',
    price: 19.99,
    rating: 4.4,
    reviewCount: 75,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908',
    description: 'Instant refresh and hydration boost.',
    category: 'toners',
    isNew: false,
    isSale: false,
  },
  {
    id: 11,
    name: 'Eye Cream',
    price: 28.99,
    rating: 4.6,
    reviewCount: 95,
    image:
      'https://us.laneige.com/cdn/shop/files/PT01_ebddc7e0-9e96-4aae-bbb3-4bedd2276497.jpg?v=1722625034',
    description: 'Reduces dark circles and puffiness.',
    category: 'moisturizers',
    isNew: false,
    isSale: false,
  },
  {
    id: 12,
    name: 'Gel Moisturizer',
    price: 25.99,
    rating: 4.7,
    reviewCount: 130,
    image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd',
    description: 'Lightweight hydration for oily skin.',
    category: 'moisturizers',
    isNew: true,
    isSale: false,
  },
];

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || 'http://localhost:3001';
const PRODUCTS_API_URL = `${API_BASE_URL}/api/products`;

function buildQueryString(params = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value));
    }
  });

  const query = searchParams.toString();
  return query ? `?${query}` : '';
}

function getErrorMessage(error, fallbackMessage = 'Something went wrong. Please try again.') {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
}

async function request(url = PRODUCTS_API_URL, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || `Request failed: ${response.status}`);
    }

    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Unable to connect to the server.'));
  }
}

export async function fetchProducts(params = {}) {
  return request(`${PRODUCTS_API_URL}${buildQueryString(params)}`);
}

export async function getProducts(params = {}) {
  try {
    return await fetchProducts(params);
  } catch (error) {
    console.error('Falling back to static products:', error);
    return {
      products: PRODUCTS,
      pagination: {
        page: 1,
        limit: PRODUCTS.length,
        total: PRODUCTS.length,
        totalPages: 1,
      },
      error: getErrorMessage(error, 'Error loading products.'),
    };
  }
}

export async function createProduct(product) {
  return request(PRODUCTS_API_URL, {
    method: 'POST',
    body: JSON.stringify(product),
  });
}

export async function updateProduct(id, product) {
  return request(`${PRODUCTS_API_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(product),
  });
}

export async function deleteProduct(id) {
  return request(`${PRODUCTS_API_URL}/${id}`, {
    method: 'DELETE',
  });
}

export async function getRecommendedProducts(id) {
  return request(`${PRODUCTS_API_URL}/recommend/${id}`);
}

export async function getProfileRecommendations(payload) {
  return request(`${API_BASE_URL}/api/recommend`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
