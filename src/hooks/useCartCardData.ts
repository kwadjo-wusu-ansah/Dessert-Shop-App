import { useMemo } from "react";
import type { DessertCatalogItem } from "../data/dessertCatalog";
import { resolveCartItemCount, resolveCartItems, resolveCartOrderTotal } from "../mappers";
import { useCart } from "./useCart";

interface CartCardDataState {
  items: ReturnType<typeof resolveCartItems>;
  itemCount: number;
  orderTotal: number;
  removeItem: (itemName: string) => void;
}

// Returns derived cart-card data and handlers from global cart state.
export function useCartCardData(catalogItems: DessertCatalogItem[]): CartCardDataState {
  const { cartEntries, removeItem } = useCart();
  const items = useMemo(
    () => resolveCartItems(catalogItems, cartEntries),
    [catalogItems, cartEntries]
  );
  const itemCount = useMemo(() => resolveCartItemCount(items), [items]);
  const orderTotal = useMemo(() => resolveCartOrderTotal(items), [items]);

  return {
    items,
    itemCount,
    orderTotal,
    removeItem,
  };
}
