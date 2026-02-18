import { useCallback, useEffect, useMemo, useReducer, type ReactNode } from "react";
import {
  resolveCartReducerState,
  resolveIsCartEntries,
  resolveInitialCartReducerState,
} from "../state";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { CartContext, type CartContextValue } from "./CartContext";

interface CartProviderProps {
  children: ReactNode;
}

const cartStorageKey = "dessert-shop-cart";
const fallbackCartEntries = resolveInitialCartReducerState();

// Provides globally shared cart entries and cart action handlers.
export function CartProvider({ children }: CartProviderProps) {
  const { resolveStoredValue, setStoredValue } = useLocalStorage({
    key: cartStorageKey,
    fallbackValue: fallbackCartEntries,
    validate: resolveIsCartEntries,
  });
  const [cartEntries, dispatchCartAction] = useReducer(
    resolveCartReducerState,
    undefined,
    () => resolveStoredValue()
  );

  // Persists cart entries whenever reducer state changes.
  useEffect(() => {
    setStoredValue(cartEntries);
  }, [cartEntries, setStoredValue]);

  // Dispatches an add action that increases the selected dessert quantity.
  const addItem = useCallback((itemName: string): void => {
    dispatchCartAction({ type: "ADD_ITEM", itemName });
  }, []);

  // Dispatches a decrease action that reduces selected dessert quantity.
  const decreaseItem = useCallback((itemName: string): void => {
    dispatchCartAction({ type: "DECREASE_ITEM", itemName });
  }, []);

  // Dispatches a remove action that deletes a cart line item.
  const removeItem = useCallback((itemName: string): void => {
    dispatchCartAction({ type: "REMOVE_ITEM", itemName });
  }, []);

  // Dispatches a clear action that resets the entire cart.
  const clearCart = useCallback((): void => {
    dispatchCartAction({ type: "CLEAR_CART" });
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
