import { useMemo, useState } from "react";
import "./App.css";
import { CartCard, type CartCardItem } from "./components/CartCard";
import {
  ConfirmedOrderModal,
  type ConfirmedOrderModalItem,
} from "./components/ConfirmedOrderModal";
import { DessertMenuCard } from "./components/DessertMenuCard";
import { getDessertCatalogItems, type DessertCatalogItem } from "./data/dessertCatalog";
import { resolveCartItems, resolveConfirmedOrderItems } from "./mappers";
import {
  resolveCartEntriesWithAddedItem,
  resolveCartEntriesWithDecreasedItem,
  resolveCartEntriesWithIncreasedItem,
  resolveCartEntriesWithoutItem,
  resolveDessertQuantity,
  resolveInitialEmptyCartEntries,
  resolveInitialOrderCollection,
  resolveInitialOrderConfirmationOpenState,
  type CartEntry,
} from "./state";

const dessertCatalogItems = getDessertCatalogItems();

// Renders the responsive populated main page with interactive cart behavior.
function App() {
  const [cartEntries, setCartEntries] = useState<CartEntry[]>(
    resolveInitialEmptyCartEntries
  );
  const [isConfirmedOrderModalOpen, setIsConfirmedOrderModalOpen] = useState(
    resolveInitialOrderConfirmationOpenState
  );
  const [confirmedOrderItems, setConfirmedOrderItems] =
    useState<ConfirmedOrderModalItem[]>(() =>
      resolveInitialOrderCollection<ConfirmedOrderModalItem>()
    );
  const cartItems = useMemo<CartCardItem[]>(
    () => resolveCartItems(dessertCatalogItems, cartEntries),
    [cartEntries]
  );

  // Adds a dessert to the cart from the default add-to-cart button.
  function handleAddToCart(dessertName: string): void {
    setCartEntries((previousEntries) =>
      resolveCartEntriesWithAddedItem(previousEntries, dessertName)
    );
  }

  // Increases quantity for a dessert from the active quantity control.
  function handleIncreaseQuantity(dessertName: string): void {
    setCartEntries((previousEntries) =>
      resolveCartEntriesWithIncreasedItem(previousEntries, dessertName)
    );
  }

  // Decreases quantity for a dessert from the active quantity control.
  function handleDecreaseQuantity(dessertName: string): void {
    setCartEntries((previousEntries) =>
      resolveCartEntriesWithDecreasedItem(previousEntries, dessertName)
    );
  }

  // Removes a dessert completely from the cart panel remove action.
  function handleRemoveCartItem(dessertName: string): void {
    setCartEntries((previousEntries) =>
      resolveCartEntriesWithoutItem(previousEntries, dessertName)
    );
  }

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
    setCartEntries(resolveInitialEmptyCartEntries());
    setConfirmedOrderItems(resolveInitialOrderCollection<ConfirmedOrderModalItem>());
    setIsConfirmedOrderModalOpen(false);
  }

  // Renders one dessert card with cart-derived quantity and callbacks.
  function renderDessertCard(dessertItem: DessertCatalogItem) {
    const dessertQuantity = resolveDessertQuantity(cartEntries, dessertItem.name);

    return (
      <DessertMenuCard
        key={dessertItem.name}
        category={dessertItem.category}
        name={dessertItem.name}
        price={dessertItem.price}
        imageSources={dessertItem.imageSources}
        isInCart={dessertQuantity > 0}
        quantity={dessertQuantity}
        onAddToCart={() => handleAddToCart(dessertItem.name)}
        onIncreaseQuantity={() => handleIncreaseQuantity(dessertItem.name)}
        onDecreaseQuantity={() => handleDecreaseQuantity(dessertItem.name)}
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
            <CartCard
              items={cartItems}
              onRemoveItem={handleRemoveCartItem}
              onConfirmOrder={handleConfirmOrderClick}
            />
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
