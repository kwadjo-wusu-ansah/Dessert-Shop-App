import { Fragment } from "react";
import { resolveCartItemCount, resolveCartOrderTotal } from "../mappers";
import { resolveCartHeading, resolveCurrencyValue } from "../utils";
import carbonNeutralIcon from "../assets/images/icon-carbon-neutral.svg";
import emptyCartIllustration from "../assets/images/illustration-empty-cart.svg";
import style from "./CartCard.module.css";
import { Icon } from "./Icon";
import { RegularButton } from "./RegularButton";

interface CartCardProps {
  items: CartCardItem[];
  onRemoveItem: (itemName: string) => void;
  onConfirmOrder?: () => void;
}

export interface CartCardItem {
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
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

// Renders a single added-item row in the populated cart.
function renderAddedItemRow(
  item: CartCardItem,
  onRemoveItem: (itemName: string) => void
) {
  return (
    <div className={style.itemRow}>
      <div className={style.itemInfo}>
        <p className={style.itemName}>{item.name}</p>
        <div className={style.quantityAndPrice}>
          <p className={style.itemQuantity}>{item.quantity}x</p>
          <p className={style.itemUnitPrice}>@ {resolveCurrencyValue(item.unitPrice)}</p>
          <p className={style.itemTotal}>{resolveCurrencyValue(item.totalPrice)}</p>
        </div>
      </div>
      <Icon
        variation="remove"
        type="button"
        className={style.removeButton}
        aria-label={`Remove ${item.name}`}
        onClick={() => onRemoveItem(item.name)}
      />
    </div>
  );
}

// Renders the populated cart section with added items and totals.
function renderPopulatedState(
  items: CartCardItem[],
  onRemoveItem: (itemName: string) => void,
  onConfirmOrder: (() => void) | undefined
) {
  const orderTotal = resolveCartOrderTotal(items);

  return (
    <>
      <div className={style.addedItems}>
        {items.map((item, index) => (
          <Fragment key={item.name}>
            {renderAddedItemRow(item, onRemoveItem)}
            {index < items.length - 1 && <div className={style.separator} /> }
          </Fragment>
        ))}
      </div>

      <div className={style.separator} />

      <div className={style.orderTotalRow}>
        <p className={style.orderTotalLabel}>Order Total</p>
        <p className={style.orderTotalValue}>{resolveCurrencyValue(orderTotal)}</p>
      </div>

      <div className={style.carbonInfo}>
        <div className={style.carbonInfoContent}>
          <img className={style.carbonIcon} src={carbonNeutralIcon} alt="" aria-hidden="true" />
          <p className={style.carbonText}>
            This is a <span className={style.carbonTextStrong}>carbon-neutral</span> delivery
          </p>
        </div>
      </div>

      <RegularButton
        variation="primary"
        text="Confirm Order"
        className={style.confirmOrderButton}
        onClick={onConfirmOrder}
      />
    </>
  );
}

// Renders the cart card with empty and populated states controlled by parent data.
export function CartCard({ items, onRemoveItem, onConfirmOrder }: CartCardProps) {
  const itemCount = resolveCartItemCount(items);
  const isEmpty = itemCount === 0;

  return (
    <aside className={style.cartCard}>
      <h2 className={style.title}>{resolveCartHeading(itemCount)}</h2>
      {isEmpty ? renderEmptyState() : renderPopulatedState(items, onRemoveItem, onConfirmOrder)}
    </aside>
  );
}
