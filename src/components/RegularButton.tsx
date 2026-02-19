import { useState } from "react";
import type { ButtonHTMLAttributes, MouseEvent } from "react";
import { resolveInitialAddToCartActiveState } from "../state";
import {
  resolveAddToCartButtonText,
  resolveDisplayQuantity,
  resolveIsControlledAddToCart,
  resolvePrimaryButtonText,
} from "../utils";
import addToCartIcon from "../assets/images/icon-add-to-cart.svg";
import { Button } from "./Button";
import type { ButtonVariationType } from "./ButtonTypes";
import { Icon } from "./Icon";
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

  const [isAddToCartActive, setIsAddToCartActive] = useState(
    resolveInitialAddToCartActiveState(variation, isActive)
  );
  const [internalQuantity, setInternalQuantity] = useState(1);


  const isControlledAddToCart = resolveIsControlledAddToCart(
    variation,
    onAddToCart,
    onIncreaseQuantity,
    onDecreaseQuantity,
    quantity
  );
  
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
