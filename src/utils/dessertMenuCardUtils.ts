// Resolves the image class list based on the card cart state.
export function resolveImageClassName(baseClassName: string, inCartClassName: string, isInCart: boolean): string {
  if (isInCart) {
    return `${baseClassName} ${inCartClassName}`;
  }

  return baseClassName;
}
