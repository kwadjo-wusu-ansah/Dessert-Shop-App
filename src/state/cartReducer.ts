import {
  resolveCartEntriesWithDecreasedItem,
  resolveCartEntriesWithIncreasedItem,
  resolveCartEntriesWithoutItem,
  resolveInitialEmptyCartEntries,
  type CartEntry,
} from "./cartState";

export type CartAction =
  | {
      type: "ADD_ITEM";
      itemName: string;
    }
  | {
      type: "DECREASE_ITEM";
      itemName: string;
    }
  | {
      type: "REMOVE_ITEM";
      itemName: string;
    }
  | {
      type: "CLEAR_CART";
    };

// Returns the initial reducer state for cart entries.
export function resolveInitialCartReducerState(): CartEntry[] {
  return resolveInitialEmptyCartEntries();
}

// Resolves next cart entries from a reducer action.
export function resolveCartReducerState(
  cartEntries: CartEntry[],
  action: CartAction
): CartEntry[] {
  if (action.type === "ADD_ITEM") {
    return resolveCartEntriesWithIncreasedItem(cartEntries, action.itemName);
  }

  if (action.type === "DECREASE_ITEM") {
    return resolveCartEntriesWithDecreasedItem(cartEntries, action.itemName);
  }

  if (action.type === "REMOVE_ITEM") {
    return resolveCartEntriesWithoutItem(cartEntries, action.itemName);
  }

  if (action.type === "CLEAR_CART") {
    return resolveInitialEmptyCartEntries();
  }

  const exhaustiveAction: never = action;
  return exhaustiveAction;
}
