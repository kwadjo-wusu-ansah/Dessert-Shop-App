export interface CartEntry {
  itemName: string;
  quantity: number;
}

// Returns true when an unknown value is a plain object record.
function resolveIsRecordValue(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

// Returns true when an unknown value matches the cart entry shape.
export function resolveIsCartEntry(value: unknown): value is CartEntry {
  if (!resolveIsRecordValue(value)) {
    return false;
  }

  if (typeof value.itemName !== "string") {
    return false;
  }

  if (typeof value.quantity !== "number") {
    return false;
  }

  if (!Number.isInteger(value.quantity)) {
    return false;
  }

  return value.quantity > 0;
}

// Returns true when an unknown value is a list of valid cart entries.
export function resolveIsCartEntries(value: unknown): value is CartEntry[] {
  if (!Array.isArray(value)) {
    return false;
  }

  return value.every((cartEntry) => resolveIsCartEntry(cartEntry));
}

// Returns the cart entry that matches a dessert name.
function resolveMatchingCartEntry(
  cartEntries: CartEntry[],
  dessertName: string
): CartEntry | undefined {
  return cartEntries.find((entry) => entry.itemName === dessertName);
}

// Returns an empty initial cart so no desserts are selected on first load.
export function resolveInitialEmptyCartEntries(): CartEntry[] {
  return [];
}

// Returns the quantity for a single dessert name from cart entries.
export function resolveDessertQuantity(
  cartEntries: CartEntry[],
  dessertName: string
): number {
  const matchingEntry = resolveMatchingCartEntry(cartEntries, dessertName);

  if (!matchingEntry) {
    return 0;
  }

  return matchingEntry.quantity;
}

// Adds a dessert to cart entries or leaves existing entries unchanged.
export function resolveCartEntriesWithAddedItem(
  cartEntries: CartEntry[],
  dessertName: string
): CartEntry[] {
  const hasExistingEntry = Boolean(resolveMatchingCartEntry(cartEntries, dessertName));

  if (hasExistingEntry) {
    return cartEntries;
  }

  return [
    ...cartEntries,
    {
      itemName: dessertName,
      quantity: 1,
    },
  ];
}

// Increases quantity for a dessert entry and creates it when missing.
export function resolveCartEntriesWithIncreasedItem(
  cartEntries: CartEntry[],
  dessertName: string
): CartEntry[] {
  const hasExistingEntry = Boolean(resolveMatchingCartEntry(cartEntries, dessertName));

  if (!hasExistingEntry) {
    return [
      ...cartEntries,
      {
        itemName: dessertName,
        quantity: 1,
      },
    ];
  }

  return cartEntries.map((entry) => {
    if (entry.itemName !== dessertName) {
      return entry;
    }

    return {
      ...entry,
      quantity: entry.quantity + 1,
    };
  });
}

// Decreases quantity for a dessert entry and removes it at zero.
export function resolveCartEntriesWithDecreasedItem(
  cartEntries: CartEntry[],
  dessertName: string
): CartEntry[] {
  return cartEntries.flatMap((entry) => {
    if (entry.itemName !== dessertName) {
      return [entry];
    }

    if (entry.quantity <= 1) {
      return [];
    }

    return [
      {
        ...entry,
        quantity: entry.quantity - 1,
      },
    ];
  });
}

// Removes an item from cart entries completely.
export function resolveCartEntriesWithoutItem(
  cartEntries: CartEntry[],
  dessertName: string
): CartEntry[] {
  return cartEntries.filter((entry) => entry.itemName !== dessertName);
}
