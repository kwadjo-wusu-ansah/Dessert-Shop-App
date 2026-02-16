import emptyCartIllustration from "../assets/images/illustration-empty-cart.svg";
import style from "./CartCard.module.css";

interface CartCardProps {
  itemCount: number;
  isEmpty: boolean;
}

// Returns the cart heading text with the current item count.
function resolveCartHeading(itemCount: number): string {
  return `Your Cart (${itemCount})`;
}

// Renders the empty cart placeholder section.
function renderEmptyState() {
  return (
    <div className={style.emptyState}>
      <img
        className={style.emptyIllustration}
        src={emptyCartIllustration}
        alt=""
        aria-hidden="true"
      />
      <p className={style.emptyMessage}>Your added items will appear here</p>
    </div>
  );
}

// Renders the cart card component with a parent-controlled empty state.
export function CartCard({ itemCount, isEmpty }: CartCardProps) {
  return (
    <aside className={style.cartCard}>
      <h2 className={style.title}>{resolveCartHeading(itemCount)}</h2>
      {isEmpty ? renderEmptyState() : null}
    </aside>
  );
}
