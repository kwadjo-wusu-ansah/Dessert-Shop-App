import type { ConfirmedOrderModalItem } from "../components/ConfirmedOrderModal";

// Filters out any invalid or empty confirmed-order items before rendering.
export function resolveVisibleConfirmedOrderItems(
  items: ConfirmedOrderModalItem[]
): ConfirmedOrderModalItem[] {
  return items.filter((item) => item.quantity > 0 && item.totalPrice > 0);
}

// Computes the full order total from all confirmed order items.
export function resolveConfirmedOrderTotal(items: ConfirmedOrderModalItem[]): number {
  return items.reduce((runningTotal, item) => runningTotal + item.totalPrice, 0);
}
