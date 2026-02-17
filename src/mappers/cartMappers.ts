import type { CartCardItem } from "../components/CartCard";
import type { ConfirmedOrderModalItem } from "../components/ConfirmedOrderModal";
import type { DessertCatalogItem } from "../data/dessertCatalog";
import type { CartEntry } from "../state";

// Builds a quick lookup map for catalog items by dessert name.
function resolveDessertCatalogLookup(
  catalogItems: DessertCatalogItem[]
): Map<string, DessertCatalogItem> {
  return new Map(catalogItems.map((catalogItem) => [catalogItem.name, catalogItem]));
}

// Builds cart display items from cart state and catalog details.
export function resolveCartItems(
  catalogItems: DessertCatalogItem[],
  cartEntries: CartEntry[]
): CartCardItem[] {
  const catalogLookup = resolveDessertCatalogLookup(catalogItems);

  return cartEntries.flatMap((cartEntry) => {
    const matchingCatalogItem = catalogLookup.get(cartEntry.itemName);

    if (!matchingCatalogItem || cartEntry.quantity < 1) {
      return [];
    }

    return [
      {
        name: matchingCatalogItem.name,
        quantity: cartEntry.quantity,
        unitPrice: matchingCatalogItem.price,
        totalPrice: matchingCatalogItem.price * cartEntry.quantity,
      },
    ];
  });
}

// Builds confirmed-order modal items from cart state and catalog details.
export function resolveConfirmedOrderItems(
  catalogItems: DessertCatalogItem[],
  cartEntries: CartEntry[]
): ConfirmedOrderModalItem[] {
  const catalogLookup = resolveDessertCatalogLookup(catalogItems);

  return cartEntries.flatMap((cartEntry) => {
    const matchingCatalogItem = catalogLookup.get(cartEntry.itemName);

    if (!matchingCatalogItem || cartEntry.quantity < 1) {
      return [];
    }

    return [
      {
        name: matchingCatalogItem.name,
        quantity: cartEntry.quantity,
        unitPrice: matchingCatalogItem.price,
        totalPrice: matchingCatalogItem.price * cartEntry.quantity,
        thumbnail: matchingCatalogItem.thumbnailSource,
      },
    ];
  });
}

// Computes the total quantity across all cart items.
export function resolveCartItemCount(items: CartCardItem[]): number {
  return items.reduce((runningTotal, item) => runningTotal + item.quantity, 0);
}

// Computes the order total across all cart items.
export function resolveCartOrderTotal(items: CartCardItem[]): number {
  return items.reduce((runningTotal, item) => runningTotal + item.totalPrice, 0);
}
