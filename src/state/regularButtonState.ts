import type { ButtonVariationType } from "../components/ButtonTypes";

// Returns the initial active state for add-to-cart controls.
export function resolveInitialAddToCartActiveState(
  variation: ButtonVariationType,
  isActive: boolean
): boolean {
  return variation === "addToCart" && isActive;
}
