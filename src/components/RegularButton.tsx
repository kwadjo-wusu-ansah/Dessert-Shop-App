import { useState } from "react";
import type { ButtonHTMLAttributes, MouseEvent } from "react";
import { Button } from "./Button";
import type { ButtonVariationType } from "./ButtonTypes";
import { Icon } from "./Icon";
import addToCartIcon from "../assets/images/icon-add-to-cart.svg";
import style from "./Button.module.css";

interface RegularButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variation: ButtonVariationType;
  text?: string;
  isActive?: boolean;
}

// Returns the fallback label for a primary button.
function resolvePrimaryButtonText(text: string | undefined): string {
  return text ?? "Placeholder";
}

// Returns the fallback label for an add-to-cart button.
function resolveAddToCartButtonText(text: string | undefined): string {
  return text ?? "Add to Cart";
}

// Returns the initial active state for add-to-cart controls.
function resolveInitialAddToCartActiveState(
  variation: ButtonVariationType,
  isActive: boolean
): boolean {
  return variation === "addToCart" && isActive;
}

// Renders a regular button variation using explicit branch rendering.
export function RegularButton({
  variation,
  text,
  isActive = false,
  className,
  onClick,
  disabled,
  ...rest
}: RegularButtonProps) {
  const [isAddToCartActive, setIsAddToCartActive] = useState(
    resolveInitialAddToCartActiveState(variation, isActive)
  );
  const [quantity, setQuantity] = useState(1);

  if (variation === "primary") {
    return (
      <Button
        variation="button"
        variationType="primary"
        className={className}
        onClick={onClick}
        disabled={disabled}
        {...rest}
      >
        {resolvePrimaryButtonText(text)}
      </Button>
    );
  }

  if (variation === "addToCart" && !isAddToCartActive) {
    // Activates add-to-cart mode and initializes quantity when clicked.
    const handleAddToCartClick = (event: MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);

      if (event.defaultPrevented || disabled) {
        return;
      }

      setIsAddToCartActive(true);
      setQuantity(1);
    };

    return (
      <Button
        variation="button"
        variationType="addToCart"
        className={className}
        onClick={handleAddToCartClick}
        disabled={disabled}
        {...rest}
      >
        <img
          className={style.addToCartIcon}
          src={addToCartIcon}
          alt=""
          aria-hidden="true"
        />
        <span className={style.addToCartLabel}>
          {resolveAddToCartButtonText(text)}
        </span>
      </Button>
    );
  }

  if (variation === "addToCart" && isAddToCartActive) {
    // Increases active add-to-cart quantity by one.
    const handleIncreaseQuantity = () => {
      if (disabled) {
        return;
      }

      setQuantity((previousQuantity) => previousQuantity + 1);
    };

    // Decreases quantity and resets to default state when quantity reaches one.
    const handleDecreaseQuantity = () => {
      if (disabled) {
        return;
      }

      if (quantity === 1) {
        setIsAddToCartActive(false);
        setQuantity(1);
        return;
      }

      setQuantity((previousQuantity) => previousQuantity - 1);
    };

    return (
      <div className={[style.button, style.addToCartActive, className ?? ""].join(" ")}>
        <Icon
          variation="subtract"
          type="button"
          onClick={handleDecreaseQuantity}
          aria-label="Decrease quantity"
          disabled={disabled}
        />
        <span className={style.addToCartQuantity}>{quantity}</span>
        <Icon
          variation="add"
          type="button"
          onClick={handleIncreaseQuantity}
          aria-label="Increase quantity"
          disabled={disabled}
        />
      </div>
    );
  }
}
