import type { ButtonHTMLAttributes } from "react";
import { Button } from "./Button";
import type { ButtonVariationType } from "./ButtonTypes";

interface RegularButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variation?: ButtonVariationType;
  text?: string;
}

// Returns the button variation and falls back to primary.
function resolveButtonVariation(
  variation: ButtonVariationType | undefined
): ButtonVariationType {
  return variation ?? "primary";
}

// Renders a standard button with a default primary variation.
function resolveButtonText(text: string | undefined): string {
  return text ?? "Placeholder";
}

// Renders a regular button using the shared button variation system.
export function RegularButton({
  variation,
  text,
  ...rest
}: RegularButtonProps) {
  const variationType = resolveButtonVariation(variation);
  const buttonText = resolveButtonText(text);

  return (
    <Button variation="button" variationType={variationType} {...rest}>
      {buttonText}
    </Button>
  );
}
