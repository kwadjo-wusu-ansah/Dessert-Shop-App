import { useCallback, useMemo, useState, type ReactNode } from "react";
import {
  resolveCartEntriesWithDecreasedItem,
  resolveCartEntriesWithIncreasedItem,
  resolveCartEntriesWithoutItem,
  resolveInitialEmptyCartEntries,
  type CartEntry,
} from "../state";
import { CartContext, type CartContextValue } from "./CartContext";

interface CartProviderProps {
  children: ReactNode;
}

// Provides globally shared cart entries and cart action handlers.
export function CartProvider({ children }: CartProviderProps) {
  const [cartEntries, setCartEntries] = useState<CartEntry[]>(resolveInitialEmptyCartEntries);

  // Adds a dessert and increases quantity when the dessert already exists.
  const addItem = useCallback((itemName: string): void => {
    setCartEntries((previousEntries) =>
      resolveCartEntriesWithIncreasedItem(previousEntries, itemName)
    );
  }, []);

  // Decreases a dessert quantity and removes it when quantity reaches zero.
  const decreaseItem = useCallback((itemName: string): void => {
    setCartEntries((previousEntries) =>
      resolveCartEntriesWithDecreasedItem(previousEntries, itemName)
    );
  }, []);

  // Removes a dessert line item from the cart entirely.
  const removeItem = useCallback((itemName: string): void => {
    setCartEntries((previousEntries) =>
      resolveCartEntriesWithoutItem(previousEntries, itemName)
    );
  }, []);

  // Clears every dessert from the cart.
  const clearCart = useCallback((): void => {
    setCartEntries(resolveInitialEmptyCartEntries());
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      cartEntries,
      addItem,
      decreaseItem,
      removeItem,
      clearCart,
    }),
    [cartEntries, addItem, decreaseItem, removeItem, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
