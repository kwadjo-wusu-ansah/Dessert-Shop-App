import style from "./Button.module.css";
import type { ButtonProps, ButtonVariationType, IconVariationType } from "./ButtonTypes";


function variationToStyle(variation: "icon" | "button"): string {
  return variation === "icon" ? style.iconButton : style.button;
}

function variationTypeToStyle(
  variationType: IconVariationType | ButtonVariationType
): string {
  switch (variationType) {
    case "subtract":
      return style.subtract;
    case "remove":
      return style.remove;
    case "add":
      return style.add;
    case "addToCart":
      return style.addToCart;
    case "primary":
      return style.primary;
    default:
      return "";
  }
}

export function Button({
  children,
  variation,
  variationType,
  className,
  ...rest
}: ButtonProps) {
  const classes = [
    variationToStyle(variation),
    variationTypeToStyle(variationType),
    className ?? "",
  ].join(" ");

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}