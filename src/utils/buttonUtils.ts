import type { ButtonVariationType } from "../components/ButtonTypes";

// Returns the fallback label for a primary button.
export function resolvePrimaryButtonText(text: string | undefined): string {
  return text ?? "Placeholder";
}

// Returns the fallback label for an add-to-cart button.
export function resolveAddToCartButtonText(text: string | undefined): string {
  return text ?? "Add to Cart";
}

// Determines whether add-to-cart state is controlled by parent callbacks.
export function resolveIsControlledAddToCart(
  variation: ButtonVariationType,
  onAddToCart: (() => void) | undefined,
  onIncreaseQuantity: (() => void) | undefined,
  onDecreaseQuantity: (() => void) | undefined,
  quantity: number | undefined
): boolean {
  if (variation !== "addToCart") {
    return false;
  }

  return Boolean(
    onAddToCart || onIncreaseQuantity || onDecreaseQuantity || quantity !== undefined
  );
}

// Returns the active quantity with a minimum value of one.
export function resolveDisplayQuantity(quantity: number | undefined): number {
  if (!quantity || quantity < 1) {
    return 1;
  }

  return quantity;
}
