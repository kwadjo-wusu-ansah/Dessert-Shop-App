import { useEffect } from "react";
import type { MouseEvent } from "react";
import {
  resolveConfirmedOrderTotal,
  resolveVisibleConfirmedOrderItems,
} from "../mappers";
import { resolveCurrencyValue } from "../utils";
import orderConfirmedIcon from "../assets/images/icon-order-confirmed.svg";
import style from "./ConfirmedOrderModal.module.css";
import { RegularButton } from "./RegularButton";

interface ConfirmedOrderModalProps {
  isOpen: boolean;
  items: ConfirmedOrderModalItem[];
  onClose: () => void;
  onStartNewOrder: () => void;
}

export interface ConfirmedOrderModalItem {
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  thumbnail: string;
}

// Closes the modal when Escape is pressed while it is open.
function useEscapeClose(isOpen: boolean, onClose: () => void): void {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);
}

// Closes the modal when the overlay itself is clicked.
function handleOverlayClick(
  event: MouseEvent<HTMLDivElement>,
  onClose: () => void,
): void {
  if (event.target === event.currentTarget) {
    onClose();
  }
}

// Renders the confirmed-order modal with responsive layout and dynamic order items.
export function ConfirmedOrderModal({
  isOpen,
  items,
  onClose,
  onStartNewOrder,
}: ConfirmedOrderModalProps) {
  useEscapeClose(isOpen, onClose);

  if (!isOpen) {
    return null;
  }

  const confirmedOrderItems = resolveVisibleConfirmedOrderItems(items);
  const orderTotal = resolveConfirmedOrderTotal(confirmedOrderItems);

  return (
    <div
      className={style.overlay}
      onClick={(event) => handleOverlayClick(event, onClose)}
    >
      <section
        className={style.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmed-order-title"
      >
        <header className={style.titleInfo}>
          <img
            className={style.confirmationIcon}
            src={orderConfirmedIcon}
            alt=""
            aria-hidden="true"
          />
          <div className={style.titleTextGroup}>
            <h2 id="confirmed-order-title" className={style.title}>
              Order Confirmed
            </h2>
            <p className={style.subtitle}>We hope you enjoy your food!</p>
          </div>
        </header>

        <div className={style.confirmedItemsPanel}>
          <div className={style.itemList}>
            {confirmedOrderItems.map((confirmedOrderItem, index) => (
              <div key={`${confirmedOrderItem.name}-${index}`}>
                <div className={style.itemRow}>
                  <div className={style.itemInfo}>
                    <img
                      className={style.itemImage}
                      src={confirmedOrderItem.thumbnail}
                      alt={confirmedOrderItem.name}
                    />
                    <div className={style.itemTextGroup}>
                      <p className={style.itemName}>
                        {confirmedOrderItem.name}
                      </p>
                      <div className={style.amountRow}>
                        <p className={style.itemQuantity}>
                          {confirmedOrderItem.quantity}x
                        </p>
                        <p className={style.itemUnitPrice}>
                          @ {resolveCurrencyValue(confirmedOrderItem.unitPrice)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className={style.itemTotal}>
                    {resolveCurrencyValue(confirmedOrderItem.totalPrice)}
                  </p>
                </div>
                {index < confirmedOrderItems.length - 1 && (
                  <div className={style.separator} />
                )}
              </div>
            ))}
          </div>

          <div className={style.separator} />

          <div className={style.orderTotalRow}>
            <p className={style.orderTotalLabel}>Order Total</p>
            <p className={style.orderTotalValue}>
              {resolveCurrencyValue(orderTotal)}
            </p>
          </div>
        </div>

        <RegularButton
          variation="primary"
          text="Start New Order"
          className={style.startNewOrderButton}
          onClick={onStartNewOrder}
        />
      </section>
    </div>
  );
}
