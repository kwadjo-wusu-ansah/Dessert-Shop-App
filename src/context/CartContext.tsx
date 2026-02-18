import { createContext } from "react";
import type { CartEntry } from "../state";

export interface CartContextValue {
  cartEntries: CartEntry[];
  addItem: (itemName: string) => void;
  decreaseItem: (itemName: string) => void;
  removeItem: (itemName: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextValue | undefined>(undefined);
