import { useState } from "react";
import "./App.css";
import { CartCard } from "./components/CartCard";
import {
  ConfirmedOrderModal,
  type ConfirmedOrderModalItem,
} from "./components/ConfirmedOrderModal";
import { DessertMenuCard } from "./components/DessertMenuCard";
import { getDessertCatalogItems, type DessertCatalogItem } from "./data/dessertCatalog";
import { useCart } from "./hooks";
import { resolveConfirmedOrderItems } from "./mappers";
import {
  resolveInitialOrderCollection,
  resolveInitialOrderConfirmationOpenState,
} from "./state";

const dessertCatalogItems = getDessertCatalogItems();

// Renders the responsive populated main page with interactive cart behavior.
function App() {
  const { cartEntries, clearCart } = useCart();
  const [isConfirmedOrderModalOpen, setIsConfirmedOrderModalOpen] = useState(
    resolveInitialOrderConfirmationOpenState
  );
  const [confirmedOrderItems, setConfirmedOrderItems] =
    useState<ConfirmedOrderModalItem[]>(() =>
      resolveInitialOrderCollection<ConfirmedOrderModalItem>()
    );

  // Opens the confirmation modal with a snapshot of current cart selections.
  function handleConfirmOrderClick(): void {
    const nextConfirmedOrderItems = resolveConfirmedOrderItems(
      dessertCatalogItems,
      cartEntries
    );

    if (nextConfirmedOrderItems.length === 0) {
      return;
    }

    setConfirmedOrderItems(nextConfirmedOrderItems);
    setIsConfirmedOrderModalOpen(true);
  }

  // Closes the confirmation modal and keeps current cart selections unchanged.
  function handleCloseConfirmedOrderModal(): void {
    setIsConfirmedOrderModalOpen(false);
  }

  // Resets the app to a fresh order after order confirmation.
  function handleStartNewOrder(): void {
    clearCart();
    setConfirmedOrderItems(resolveInitialOrderCollection<ConfirmedOrderModalItem>());
    setIsConfirmedOrderModalOpen(false);
  }

  // Renders one dessert card using globally managed cart behavior.
  function renderDessertCard(dessertItem: DessertCatalogItem) {
    return (
      <DessertMenuCard
        key={dessertItem.name}
        category={dessertItem.category}
        name={dessertItem.name}
        price={dessertItem.price}
        imageSources={dessertItem.imageSources}
      />
    );
  }

  return (
    <>
      <main className="appShell">
        <div className="mainLayout">
          <section className="dessertCatalogSection">
            <h1 className="pageTitle">Desserts</h1>
            <div className="dessertGrid">{dessertCatalogItems.map(renderDessertCard)}</div>
          </section>
          <section className="cartSection">
            <CartCard onConfirmOrder={handleConfirmOrderClick} />
          </section>
        </div>
      </main>
      <ConfirmedOrderModal
        isOpen={isConfirmedOrderModalOpen}
        items={confirmedOrderItems}
        onClose={handleCloseConfirmedOrderModal}
        onStartNewOrder={handleStartNewOrder}
      />
    </>
  );
}

export default App;
