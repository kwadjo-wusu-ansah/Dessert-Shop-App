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
  quantity?: number;
  onAddToCart?: () => void;
  onIncreaseQuantity?: () => void;
  onDecreaseQuantity?: () => void;
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

// Determines whether add-to-cart state is controlled by parent callbacks.
function resolveIsControlledAddToCart(
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
function resolveDisplayQuantity(quantity: number | undefined): number {
  if (!quantity || quantity < 1) {
    return 1;
  }

  return quantity;
}

// Renders a regular button variation using explicit branch rendering.
export function RegularButton({
  variation,
  text,
  isActive = false,
  quantity,
  onAddToCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
  className,
  onClick,
  disabled,
  ...rest
}: RegularButtonProps) {
  const isControlledAddToCart = resolveIsControlledAddToCart(
    variation,
    onAddToCart,
    onIncreaseQuantity,
    onDecreaseQuantity,
    quantity
  );
  const [isAddToCartActive, setIsAddToCartActive] = useState(
    resolveInitialAddToCartActiveState(variation, isActive)
  );
  const [internalQuantity, setInternalQuantity] = useState(1);
  const isAddToCartControlActive = isControlledAddToCart ? isActive : isAddToCartActive;
  const displayQuantity = isControlledAddToCart
    ? resolveDisplayQuantity(quantity)
    : internalQuantity;

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

  if (variation === "addToCart" && !isAddToCartControlActive) {
    // Activates add-to-cart mode and initializes quantity when clicked.
    const handleAddToCartClick = (event: MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);

      if (event.defaultPrevented || disabled) {
        return;
      }

      onAddToCart?.();

      if (isControlledAddToCart) {
        return;
      }

      setIsAddToCartActive(true);
      setInternalQuantity(1);
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

  if (variation === "addToCart" && isAddToCartControlActive) {
    // Increases active add-to-cart quantity by one.
    const handleIncreaseQuantity = () => {
      if (disabled) {
        return;
      }

      onIncreaseQuantity?.();

      if (isControlledAddToCart) {
        return;
      }

      setInternalQuantity((previousQuantity) => previousQuantity + 1);
    };

    // Decreases quantity and resets to default state when quantity reaches one.
    const handleDecreaseQuantity = () => {
      if (disabled) {
        return;
      }

      onDecreaseQuantity?.();

      if (isControlledAddToCart) {
        return;
      }

      if (internalQuantity === 1) {
        setIsAddToCartActive(false);
        setInternalQuantity(1);
        return;
      }

      setInternalQuantity((previousQuantity) => previousQuantity - 1);
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
        <span className={style.addToCartQuantity}>{displayQuantity}</span>
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
