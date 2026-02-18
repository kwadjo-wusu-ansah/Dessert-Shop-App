import { useCallback, useMemo } from "react";
import { resolveDessertQuantity } from "../state";
import { useCart } from "./useCart";

interface DessertCartItemState {
  quantity: number;
  isInCart: boolean;
  handleAddToCart: () => void;
  handleIncreaseQuantity: () => void;
  handleDecreaseQuantity: () => void;
}

// Returns cart state and handlers for one dessert card entry.
export function useDessertCartItem(dessertName: string): DessertCartItemState {
  const { cartEntries, addItem, decreaseItem } = useCart();
  const quantity = useMemo(
    () => resolveDessertQuantity(cartEntries, dessertName),
    [cartEntries, dessertName]
  );
  const isInCart = quantity > 0;

  // Adds one dessert unit from default and increment controls.
  const handleAddToCart = useCallback((): void => {
    addItem(dessertName);
  }, [addItem, dessertName]);

  // Increases one dessert unit from active quantity controls.
  const handleIncreaseQuantity = useCallback((): void => {
    addItem(dessertName);
  }, [addItem, dessertName]);

  // Decreases one dessert unit from active quantity controls.
  const handleDecreaseQuantity = useCallback((): void => {
    decreaseItem(dessertName);
  }, [decreaseItem, dessertName]);

  return {
    quantity,
    isInCart,
    handleAddToCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  };
}
