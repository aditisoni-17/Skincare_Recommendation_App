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
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export async function createOrder(payload) {
  const items = Array.isArray(payload?.items) ? payload.items : [];
  const total = items.reduce((sum, item) => {
    const price = Number(item?.price) || 0;
    const quantity = Number(item?.quantity) || 1;
    return sum + price * quantity;
  }, 0);

  const order = {
    id: `ORD-${Date.now()}`,
    items,
    shipping: payload?.shipping || {},
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
