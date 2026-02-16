import { useEffect } from "react";
import type { MouseEvent } from "react";
import orderConfirmedIcon from "../assets/images/icon-order-confirmed.svg";
import cremeBruleeThumbnail from "../assets/images/image-creme-brulee-thumbnail.jpg";
import pannaCottaThumbnail from "../assets/images/image-panna-cotta-thumbnail.jpg";
import tiramisuThumbnail from "../assets/images/image-tiramisu-thumbnail.jpg";
import style from "./ConfirmedOrderModal.module.css";
import { RegularButton } from "./RegularButton";

interface ConfirmedOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ConfirmedOrderItem {
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  thumbnail: string;
}

// Returns the static confirmed-order item list used for visual modal design.
function resolveConfirmedOrderItems(): ConfirmedOrderItem[] {
  return [
    {
      name: "Classic Tiramisu",
      quantity: 1,
      unitPrice: 5.5,
      totalPrice: 5.5,
      thumbnail: tiramisuThumbnail,
    },
    {
      name: "Vanilla Bean Crème Brûlée",
      quantity: 4,
      unitPrice: 7,
      totalPrice: 28,
      thumbnail: cremeBruleeThumbnail,
    },
    {
      name: "Vanilla Panna Cotta",
      quantity: 2,
      unitPrice: 6.5,
      totalPrice: 13,
      thumbnail: pannaCottaThumbnail,
    },
  ];
}

// Formats numeric amounts to currency strings with two decimal places.
function resolveCurrencyValue(value: number): string {
  return `$${value.toFixed(2)}`;
}

// Computes the full order total from all confirmed order items.
function resolveOrderTotal(items: ConfirmedOrderItem[]): number {
  return items.reduce((runningTotal, item) => runningTotal + item.totalPrice, 0);
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
  onClose: () => void
): void {
  if (event.target === event.currentTarget) {
    onClose();
  }
}

// Renders the static confirmed-order modal UI and close interactions.
export function ConfirmedOrderModal({ isOpen, onClose }: ConfirmedOrderModalProps) {
  useEscapeClose(isOpen, onClose);

  if (!isOpen) {
    return null;
  }

  const confirmedOrderItems = resolveConfirmedOrderItems();
  const orderTotal = resolveOrderTotal(confirmedOrderItems);

  return (
    <div className={style.overlay} onClick={(event) => handleOverlayClick(event, onClose)}>
      <section className={style.modal} role="dialog" aria-modal="true">
        <header className={style.titleInfo}>
          <img
            className={style.confirmationIcon}
            src={orderConfirmedIcon}
            alt=""
            aria-hidden="true"
          />
          <div className={style.titleTextGroup}>
            <h2 className={style.title}>Order Confirmed</h2>
            <p className={style.subtitle}>We hope you enjoy your food!</p>
          </div>
        </header>

        <div className={style.confirmedItemsPanel}>
          <div className={style.itemList}>
            {confirmedOrderItems.map((confirmedOrderItem, index) => (
              <div key={confirmedOrderItem.name}>
                <div className={style.itemRow}>
                  <div className={style.itemInfo}>
                    <img
                      className={style.itemImage}
                      src={confirmedOrderItem.thumbnail}
                      alt={confirmedOrderItem.name}
                    />
                    <div className={style.itemTextGroup}>
                      <p className={style.itemName}>{confirmedOrderItem.name}</p>
                      <div className={style.amountRow}>
                        <p className={style.itemQuantity}>{confirmedOrderItem.quantity}x</p>
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
                {index < confirmedOrderItems.length - 1 ? (
                  <div className={style.separator} />
                ) : null}
              </div>
            ))}
          </div>

          <div className={style.separator} />

          <div className={style.orderTotalRow}>
            <p className={style.orderTotalLabel}>Order Total</p>
            <p className={style.orderTotalValue}>{resolveCurrencyValue(orderTotal)}</p>
          </div>
        </div>

        <RegularButton
          variation="primary"
          text="Start New Order"
          className={style.startNewOrderButton}
        />
      </section>
    </div>
  );
}
