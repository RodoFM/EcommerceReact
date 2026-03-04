import { createContext, useEffect, useMemo, useState } from "react";

export const CartContext = createContext(null);

const CART_LS_KEY = "cart";

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_LS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_LS_KEY, JSON.stringify(cart));
  }, [cart]);

  const totalQuantity = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity * item.precio, 0),
    [cart]
  );

const addItem = (product, quantity) => {
  let success = true;

  setCart((prev) => {
    const existing = prev.find((p) => p.id === product.id);
    const currentQty = existing?.quantity ?? 0;
    const newQty = currentQty + quantity;

    if (newQty > product.stock) {
      success = false;
      return prev;
    }

    if (existing) {
      return prev.map((p) =>
        p.id === product.id ? { ...p, quantity: newQty } : p
      );
    }

    return [...prev, { ...product, quantity }];
  });

  return success;
};


  const removeItem = (id) => setCart((prev) => prev.filter((p) => p.id !== id));
  const clearCart = () => setCart([]);
  const updateItemQty = (id, quantity) => {
    if (quantity <= 0) return removeItem(id);
    setCart((prev) => prev.map((p) => (p.id === id ? { ...p, quantity } : p)));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clearCart,
        updateItemQty,
        totalQuantity,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
