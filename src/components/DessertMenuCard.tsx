import { useDessertCartItem } from "../hooks";
import { resolveCurrencyValue, resolveImageClassName } from "../utils";
import style from "./DessertMenuCard.module.css";
import { RegularButton } from "./RegularButton";

interface DessertImageSources {
  mobile: string;
  tablet: string;
  desktop: string;
}

interface DessertMenuCardProps {
  category: string;
  name: string;
  price: number;
  imageSources: DessertImageSources;
}

// Renders a reusable dessert menu card with globally shared cart state.
export function DessertMenuCard({
  category,
  name,
  price,
  imageSources,
}: DessertMenuCardProps) {
  const {
    quantity,
    isInCart,
    handleAddToCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  } = useDessertCartItem(name);

  return (
    <article className={style.card}>
      <div className={style.mediaAndButton}>
        <picture className={style.picture}>
          <source media="(min-width: 1110px)" srcSet={imageSources.desktop} />
          <source media="(min-width: 768px)" srcSet={imageSources.tablet} />
          <img
            className={resolveImageClassName(style.image, style.imageInCart, isInCart)}
            src={imageSources.mobile}
            alt={name}
          />
        </picture>
        <RegularButton
          variation="addToCart"
          className={style.addToCartControl}
          isActive={isInCart}
          quantity={quantity}
          onAddToCart={handleAddToCart}
          onIncreaseQuantity={handleIncreaseQuantity}
          onDecreaseQuantity={handleDecreaseQuantity}
        />
      </div>
      <div className={style.info}>
        <p className={style.category}>{category}</p>
        <h3 className={style.name}>{name}</h3>
        <p className={style.price}>{resolveCurrencyValue(price)}</p>
      </div>
    </article>
  );
}
