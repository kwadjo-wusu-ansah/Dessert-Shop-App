# AGENTS0.md

## Purpose
Execution requirements for the Advanced Dessert Shop upgrade focused on side effects, global state, reducer-driven cart updates, and reusable custom hooks.

## Scope
Applies to the whole repository for this upgrade phase. Keep current UI behavior and visual design unless a requirement below explicitly changes behavior.

## Current Codebase Snapshot
- `src/App.tsx` owns cart entries with `useState` and passes cart data/actions through props.
- `src/state/cartState.ts` already contains pure helper functions for add/increase/decrease/remove cart behavior.
- `src/mappers/cartMappers.ts` maps cart entries to cart/confirmation display models and totals.
- `src/components/DessertMenuCard.tsx` and `src/components/CartCard.tsx` currently depend on prop drilling for cart interactions.
- `src/main.tsx` renders `App` without a context provider.

## Upgrade Goals
1. Move cart state to global context.
2. Manage cart changes through `useReducer` actions.
3. Persist cart state with `useEffect` and `localStorage`.
4. Improve render performance with memoization.
5. Encapsulate reusable logic in custom hooks.

## Mandatory Implementation Requirements

### Task 1: Global Cart Context
- Create `CartContext` with cart state and actions accessible app-wide.
- Required actions exposed by context:
  - `addItem(itemName: string)`
  - `removeItem(itemName: string)`
  - `clearCart()`
- Wrap the app with `CartProvider` in `src/main.tsx`.
- Replace cart prop drilling with context usage in cart-related components.
- Keep existing user behavior unchanged:
  - Add item from dessert card.
  - Remove item from cart.
  - Clear cart when starting a new order flow.

### Task 2: Reducer-Based State
- Use `useReducer` inside `CartProvider` instead of `useState` for cart ownership.
- Define reducer actions with clear discriminated unions:
  - `ADD_ITEM`
  - `REMOVE_ITEM`
  - `CLEAR_CART`
- Keep reducer logic centralized, predictable, and side-effect free.
- Reuse existing pure state helpers from `src/state/cartState.ts` where appropriate.

### Task 3: Persistence with Side Effects
- Persist cart state to `localStorage` whenever cart state changes.
- Hydrate initial cart state from `localStorage` on first render.
- If parsing fails or data is invalid, fall back safely to an empty cart.
- Standardize key name: `dessert-shop-cart`.
- Prefer a dedicated `useLocalStorage` hook for read/write concerns.

### Task 4: Performance Optimization
- Use `useMemo` for derived values that are reused, including:
  - cart display items
  - cart totals/counts
- Use `useCallback` for context action wrappers and handlers passed to children.
- Preserve correctness first, then optimize rerender frequency.

### Task 5: Custom Hooks
- Create `useCart()` for ergonomic, typed access to context state/actions.
- Create `useLocalStorage()` for persistence concerns.
- Hooks must be reusable and focused on a single responsibility.
- Components should depend on these hooks instead of duplicating logic.

## Suggested File Additions
- `src/context/CartContext.tsx`
- `src/hooks/useCart.ts`
- `src/hooks/useLocalStorage.ts`
- `src/context/index.ts` and `src/hooks/index.ts` (optional barrel exports)

## Behavior Flow (Usage First)
1. User opens app and previous cart (if any) is restored from `localStorage`.
2. User clicks "Add to Cart" on a dessert; reducer dispatch updates global cart.
3. Dessert card quantity controls and cart panel stay synchronized via shared context state.
4. User removes an item from cart; reducer dispatch updates cart globally.
5. User confirms order and starts a new order; cart is cleared globally and persisted empty.
6. User refreshes the page and sees the latest persisted cart state.

## Acceptance Criteria
- Cart data is globally accessible without prop drilling.
- All cart mutations run through reducer actions only.
- Cart state survives refresh via `localStorage`.
- Memoization is applied where it meaningfully reduces unnecessary work.
- Reusable hooks are used consistently across components.
- Existing responsive layout and current UX remain intact.

## Evaluation Rubric
| Criteria | Score | Description |
| --- | --- | --- |
| useEffect & Side Effects | 20 | Cart syncs with localStorage correctly and reliably. |
| Context & Reducer | 20 | Global cart state and reducer actions are clear and maintainable. |
| Performance Optimization | 20 | `useMemo` and `useCallback` reduce unnecessary recomputation/rerenders. |
| Custom Hooks | 20 | Reusable logic is encapsulated cleanly in hooks. |
| Code Quality & UI Integration | 20 | Modular structure, stable behavior, and no regressions in UI flow. |

## Optional Extensions
- Temporary notification banner when an item is added to cart.
- Dessert filtering and sorting (price/category).
- `React.memo` for list-level render optimization.
- Checkout summary page powered by global state.
