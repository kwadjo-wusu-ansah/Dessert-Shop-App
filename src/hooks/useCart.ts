import { useContext } from "react";
import { CartContext } from "../context";

// Returns cart context state and actions with provider-safety validation.
export function useCart() {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return cartContext;
}
