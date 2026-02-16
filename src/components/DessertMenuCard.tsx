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
  isInCart: boolean;
  quantity: number;
  onAddToCart: () => void;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
}

// Formats dessert prices to match the product card currency style.
function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

// Renders a reusable dessert menu card with parent-controlled cart state.
export function DessertMenuCard({
  category,
  name,
  price,
  imageSources,
  isInCart,
  quantity,
  onAddToCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: DessertMenuCardProps) {
  return (
    <article className={style.card}>
      <div className={style.mediaAndButton}>
        <picture className={style.picture}>
          <source media="(min-width: 1110px)" srcSet={imageSources.desktop} />
          <source media="(min-width: 768px)" srcSet={imageSources.tablet} />
          <img className={style.image} src={imageSources.mobile} alt={name} />
        </picture>
        <RegularButton
          variation="addToCart"
          className={style.addToCartControl}
          isActive={isInCart}
          quantity={quantity}
          onAddToCart={onAddToCart}
          onIncreaseQuantity={onIncreaseQuantity}
          onDecreaseQuantity={onDecreaseQuantity}
        />
      </div>
      <div className={style.info}>
        <p className={style.category}>{category}</p>
        <h3 className={style.name}>{name}</h3>
        <p className={style.price}>{formatPrice(price)}</p>
      </div>
    </article>
  );
}
