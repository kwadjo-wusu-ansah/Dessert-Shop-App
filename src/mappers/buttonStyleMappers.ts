import type { ButtonVariationType, IconVariationType } from "../components/ButtonTypes";

interface ButtonStyleClassMap {
  [className: string]: string;
}

// Resolves the base class name for icon and regular button render modes.
export function resolveButtonVariationClassName(
  buttonStyleClassMap: ButtonStyleClassMap,
  variation: "icon" | "button"
): string {
  if (variation === "icon") {
    return buttonStyleClassMap.iconButton ?? "";
  }

  return buttonStyleClassMap.button ?? "";
}

// Resolves the class name for a specific icon or regular button variation type.
export function resolveButtonVariationTypeClassName(
  buttonStyleClassMap: ButtonStyleClassMap,
  variationType: IconVariationType | ButtonVariationType
): string {
  switch (variationType) {
    case "subtract":
      return buttonStyleClassMap.subtract ?? "";
    case "remove":
      return buttonStyleClassMap.remove ?? "";
    case "add":
      return buttonStyleClassMap.add ?? "";
    case "addToCart":
      return buttonStyleClassMap.addToCart ?? "";
    case "primary":
      return buttonStyleClassMap.primary ?? "";
    default:
      return "";
  }
}
