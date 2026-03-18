import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

function readCartFromStorage() {
  try {
    const raw = localStorage.getItem('cart');
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeCartToStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => readCartFromStorage());

  useEffect(() => {
    writeCartToStorage(cart);
  }, [cart]);

  const addItem = (product, qty = 1) => {
    if (!product?.id) return;
    const quantity = Number.isFinite(qty) ? qty : 1;
    if (quantity <= 0) return;

    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id
            ? { ...i, quantity: (i.quantity || 1) + quantity }
            : i
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeItem = (productId) => {
    setCart((prev) => prev.filter((i) => i.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    const q = Number(newQuantity);
    if (!Number.isFinite(q)) return;
    if (q <= 0) {
      removeItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.id === productId ? { ...i, quantity: q } : i))
    );
  };

  const clearCart = () => setCart([]);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 1;
      return sum + price * quantity;
    }, 0);
  }, [cart]);

  const totalItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);
  }, [cart]);

  const value = useMemo(
    () => ({
      cart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      subtotal,
      totalItems,
    }),
    [cart, subtotal, totalItems]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

