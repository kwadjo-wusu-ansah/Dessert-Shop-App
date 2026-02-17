// Formats numeric amounts to currency strings with two decimal places.
export function resolveCurrencyValue(value: number): string {
  return `$${value.toFixed(2)}`;
}
