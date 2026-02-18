# AGENTS.md

## Purpose
Project-level instructions for coding agents working in this repository.

## Scope
These rules apply to the entire repo unless a more specific `AGENTS.md` exists in a subdirectory.

## Project Overview
Dessert Shop App is a mini e-commerce interface where users can browse desserts and add them to their cart.
The app allows users to add and remove desserts, dynamically updates totals, and displays an engaging, responsive layout.

## Feature Listing
- Browse a dessert catalog with product imagery and details.
- Add desserts to cart from the product list.
- Remove desserts from cart and update quantities.
- Dynamically calculate cart totals as items change.
- Display a responsive layout that works across mobile and desktop.

## Setup
1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Build: `npm run build`

## Coding Conventions
- Use TypeScript for all new source code in `src/`.
- Prefer reusable components over duplicated markup.
- Keep styles modular (`*.module.css`) when component-scoped.
- When styling component CSS, use values from `variables.css` for colors, spacing, typography, radius, and motion; avoid hardcoded design values unless a token is missing.
- Avoid introducing breaking UI changes unless requested.

## Architecture and Coding Style Rules
- Functional approach only.
- Each function must have a single responsibility.
- Keep function order logical:
  - Base/helper functions at the top.
  - Higher-level functions that depend on them underneath.
- Use clear, best-practice variable and function names.
- Avoid short or ambiguous names.
- Follow the existing project coding style and patterns when adding new code.
- Commenting rule:
  - Add one concise comment immediately before a function to explain what it does.
  - Do not add inline or unnecessary comments.

## UI/UX Rules
- UI implementation must be responsive and fluid across screen sizes.
- When UI screenshots are provided:
  - Match their visual direction and interaction style.
  - Implement only project-relevant features from screenshots, not every shown feature.
  - Apply strong UI principles for clarity, hierarchy, spacing, and usability.
- Before implementing UI from screenshots, create a design system reference file so UI decisions stay consistent.

## Clarification Requirement
- Before implementing any new feature or non-trivial change, ask multiple clarifying questions first.
- Before implementation, describe the planned behavior flow in a usage-first style.
- Share that behavior-first thought process first, then wait for user correction/approval before coding.

## Validation
- Run lint/tests before finalizing changes when available.
- For UI changes, verify both desktop and mobile layouts.

## Maintenance Rule
- Update this `AGENTS.md` every time the codebase changes so documentation stays current.
- Provide a git commit message for every change.

## Current Folder and File Structure
```
.
├── .gitignore
├── README.md
├── agents.md
├── agents0.md
├── data.json
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── public
│   └── vite.svg
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── assets
│   │   ├── fonts
│   │   ├── images
│   │   └── react.svg
│   ├── context
│   │   ├── CartContext.tsx
│   │   ├── CartProvider.tsx
│   │   └── index.ts
│   ├── components
│   │   ├── CartCard.module.css
│   │   ├── CartCard.tsx
│   │   ├── Button.module.css
│   │   ├── Button.tsx
│   │   ├── ButtonTypes.ts
│   │   ├── ConfirmedOrderModal.module.css
│   │   ├── ConfirmedOrderModal.tsx
│   │   ├── DessertMenuCard.module.css
│   │   ├── DessertMenuCard.tsx
│   │   ├── Icon.tsx
│   │   └── RegularButton.tsx
│   ├── data
│   │   └── dessertCatalog.ts
│   ├── index.css
│   ├── hooks
│   │   ├── index.ts
│   │   ├── useCart.ts
│   │   ├── useCartCardData.ts
│   │   ├── useDessertCartItem.ts
│   │   └── useLocalStorage.ts
│   ├── main.tsx
│   ├── mappers
│   │   ├── buttonStyleMappers.ts
│   │   ├── cartMappers.ts
│   │   ├── confirmedOrderMappers.ts
│   │   └── index.ts
│   ├── state
│   │   ├── cartState.ts
│   │   ├── cartReducer.ts
│   │   ├── index.ts
│   │   ├── orderConfirmationState.ts
│   │   └── regularButtonState.ts
│   ├── styles
│   │   ├── design-system-reference.md
│   │   └── variables.css
│   └── utils
│       ├── buttonUtils.ts
│       ├── cartTextUtils.ts
│       ├── currencyUtils.ts
│       ├── dessertMenuCardUtils.ts
│       └── index.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Concepts Tracker
Update this list whenever a concept is introduced to the project.

### Known/Used Concepts
- React function components
- TypeScript in frontend application code
- Reusable UI components
- CSS Modules for component-scoped styling
- Design token usage through `design-system.json`
- Responsive layout implementation
- Cart interactions (add/remove items and dynamic totals)
- Variant-driven regular button architecture (`primary` and `addToCart`)
- Required `variation` prop for regular button variants
- Branch-based variation rendering in `RegularButton` (matching `Icon` pattern)
- Add-to-cart regular button with project cart icon and variation-specific fallback text
- Active add-to-cart quantity control with interactive add/subtract icon buttons
- Fixed-dimension add-to-cart states to keep default and active sizes consistent
- Reusable `DessertMenuCard` with responsive image sources and context-driven cart actions
- Reusable `CartCard` with context-driven cart data/removal and optional confirm-order callback
- Reusable `ConfirmedOrderModal` with backdrop/Escape close interactions and dynamic confirmed-order item rendering
- Static dessert catalog data provider via `getDessertCatalogItems`
- Responsive populated main-page composition using `DessertMenuCard` grid and `CartCard` populated/empty states
- Main-page layout calibrated to Figma responsive nodes using a `1216px` content max width with `800px` product list and `384px` cart column structure
- Global cart state model with `CartProvider` and `useCart` hook so catalog cards and cart panel stay synchronized without prop drilling
- Reducer-driven cart actions in context (`ADD_ITEM`, `DECREASE_ITEM`, `REMOVE_ITEM`, `CLEAR_CART`) for centralized, predictable cart updates
- Cart persistence using `useEffect` localStorage syncing with safe hydration fallback to an empty cart
- Memoized cart and confirmation derived values with stable callback handlers using `useMemo` and `useCallback`
- Custom cart hooks for reusable UI composition (`useCartCardData` and `useDessertCartItem`) to reduce component-level duplication
- Populated `CartCard` state with removable line items, dynamic quantity count, computed order total, and carbon-neutral info row
- Populated responsive main-page parity for Figma nodes `10:334`, `36:313`, and `48:501`
- Cart populated-state spacing parity with Figma `10:433` by rendering item rows and separators as flat siblings in the cart stack
- App bootstraps with an empty cart state (no selected desserts, zero cart count) and transitions to populated state through interactions
- Order confirmation modal flow with cart snapshot data, item thumbnails, responsive desktop/tablet/mobile modal layouts, and start-new-order cart reset behavior
- Functional architecture split into `state`, `mappers`, and `utils` folders with barrel exports for shared logic reuse
- Advanced phase requirements documented in `agents0.md` for context/reducer/side-effect/custom-hook migration planning

### Concepts to Learn Next
- State architecture patterns for larger carts and catalogs
- Accessibility testing workflow for e-commerce UI
- Performance optimization for image-heavy product grids

## PR Notes
- Keep commits focused and small.
- Document any tradeoffs or known limitations in the PR description.
