import { useMemo, useState } from "react";
import "./App.css";
import { CartCard, type CartCardItem } from "./components/CartCard";
import { DessertMenuCard } from "./components/DessertMenuCard";
import { getDessertCatalogItems, type DessertCatalogItem } from "./data/dessertCatalog";

const dessertCatalogItems = getDessertCatalogItems();

interface CartEntry {
  itemName: string;
  quantity: number;
}

// Returns an empty initial cart so no desserts are selected on first load.
function resolveInitialEmptyCartEntries(): CartEntry[] {
  return [];
}

// Returns the quantity for a single dessert name from cart entries.
function resolveDessertQuantity(cartEntries: CartEntry[], dessertName: string): number {
  const matchingEntry = cartEntries.find((entry) => entry.itemName === dessertName);

  if (!matchingEntry) {
    return 0;
  }

  return matchingEntry.quantity;
}

// Builds a quick lookup map for catalog items by dessert name.
function resolveDessertCatalogLookup(
  catalogItems: DessertCatalogItem[]
): Map<string, DessertCatalogItem> {
  return new Map(catalogItems.map((catalogItem) => [catalogItem.name, catalogItem]));
}

// Builds cart display items from cart state and catalog details.
function resolveCartItems(
  catalogItems: DessertCatalogItem[],
  cartEntries: CartEntry[]
): CartCardItem[] {
  const catalogLookup = resolveDessertCatalogLookup(catalogItems);

  return cartEntries.flatMap((cartEntry) => {
    const matchingCatalogItem = catalogLookup.get(cartEntry.itemName);

    if (!matchingCatalogItem || cartEntry.quantity < 1) {
      return [];
    }

    return [
      {
        name: matchingCatalogItem.name,
        quantity: cartEntry.quantity,
        unitPrice: matchingCatalogItem.price,
        totalPrice: matchingCatalogItem.price * cartEntry.quantity,
      },
    ];
  });
}

// Adds a dessert to cart entries or leaves existing entries unchanged.
function resolveCartEntriesWithAddedItem(
  cartEntries: CartEntry[],
  dessertName: string
): CartEntry[] {
  const hasExistingEntry = cartEntries.some((entry) => entry.itemName === dessertName);

  if (hasExistingEntry) {
    return cartEntries;
  }

  return [
    ...cartEntries,
    {
      itemName: dessertName,
      quantity: 1,
    },
  ];
}

// Increases quantity for a dessert entry and creates it when missing.
function resolveCartEntriesWithIncreasedItem(
  cartEntries: CartEntry[],
  dessertName: string
): CartEntry[] {
  const hasExistingEntry = cartEntries.some((entry) => entry.itemName === dessertName);

  if (!hasExistingEntry) {
    return [
      ...cartEntries,
      {
        itemName: dessertName,
        quantity: 1,
      },
    ];
  }

  return cartEntries.map((entry) => {
    if (entry.itemName !== dessertName) {
      return entry;
    }

    return {
      ...entry,
      quantity: entry.quantity + 1,
    };
  });
}

// Decreases quantity for a dessert entry and removes it at zero.
function resolveCartEntriesWithDecreasedItem(
  cartEntries: CartEntry[],
  dessertName: string
): CartEntry[] {
  return cartEntries.flatMap((entry) => {
    if (entry.itemName !== dessertName) {
      return [entry];
    }

    if (entry.quantity <= 1) {
      return [];
    }

    return [
      {
        ...entry,
        quantity: entry.quantity - 1,
      },
    ];
  });
}

// Removes an item from cart entries completely.
function resolveCartEntriesWithoutItem(
  cartEntries: CartEntry[],
  dessertName: string
): CartEntry[] {
  return cartEntries.filter((entry) => entry.itemName !== dessertName);
}

// Handles confirm-order click as a placeholder until modal flow is wired.
function handleConfirmOrderClick(): void {
  return;
}

// Renders the responsive populated main page with interactive cart behavior.
function App() {
  const [cartEntries, setCartEntries] = useState<CartEntry[]>(
    resolveInitialEmptyCartEntries
  );
  const cartItems = useMemo(
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
  );
}

export default App;
