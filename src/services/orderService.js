const ORDERS_KEY = 'mock_orders';

function readOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeOrders(orders) {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch {
    throw new Error('Unable to save order right now.');
  }
}

export async function createOrder(payload) {
  const items = Array.isArray(payload?.items) ? payload.items : [];
  if (items.length === 0) {
    throw new Error('Your cart is empty.');
  }

  const total = items.reduce((sum, item) => {
    const price = Number(item?.price) || 0;
    const quantity = Number(item?.quantity) || 1;
    return sum + price * quantity;
  }, 0);

  const shipping = payload?.shipping || {};
  const requiredShippingFields = [
    'firstName',
    'lastName',
    'email',
    'address',
    'city',
    'state',
    'zipCode',
  ];

  const hasMissingShippingField = requiredShippingFields.some(
    (field) => !String(shipping[field] || '').trim()
  );

  if (hasMissingShippingField) {
    throw new Error('Please complete all shipping fields.');
  }

  const order = {
    id: `ORD-${Date.now()}`,
    items,
    shipping,
    total,
    createdAt: new Date().toISOString(),
  };

  const orders = readOrders();
  writeOrders([order, ...orders]);

  return { order };
}

export async function getOrders() {
  return { orders: readOrders() };
}
