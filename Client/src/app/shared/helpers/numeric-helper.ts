export function isPositiveInteger(value: string | null | undefined | number): boolean {
  if (value === null || value === undefined) {
    return false;
  }
  if (typeof value === 'string') {
    if (isNaN(+value)) {
      return false;
    }
    const numericValue = Number(value);
    return (Number.isInteger(numericValue) && numericValue > 0);
  }
  return Number.isInteger(value);
}
