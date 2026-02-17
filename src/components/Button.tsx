import {
  resolveButtonVariationClassName,
  resolveButtonVariationTypeClassName,
} from "../mappers";
import style from "./Button.module.css";
import type { ButtonProps } from "./ButtonTypes";

// Renders a base button with class mapping for variation and variation type.
export function Button({
  children,
  variation,
  variationType,
  className,
  ...rest
}: ButtonProps) {
  const classes = [
    resolveButtonVariationClassName(style, variation),
    resolveButtonVariationTypeClassName(style, variationType),
    className ?? "",
  ].join(" ");

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
