const ABN_WEIGHTS = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

/** Digits only. */
export function cleanAbn(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Checks an Australian Business Number using the official ATO checksum.
 * This catches typos; it does not confirm the business is active (that needs the ABN Lookup service).
 */
export function isValidAbn(value: string): boolean {
  const digits = cleanAbn(value);
  if (digits.length !== 11) return false;
  const nums = digits.split('').map(Number);
  nums[0] -= 1;
  const sum = nums.reduce((acc, n, i) => acc + n * ABN_WEIGHTS[i], 0);
  return sum % 89 === 0;
}

/** "51824753556" → "51 824 753 556". */
export function formatAbn(value: string): string {
  const d = cleanAbn(value).slice(0, 11);
  return [d.slice(0, 2), d.slice(2, 5), d.slice(5, 8), d.slice(8, 11)].filter(Boolean).join(' ');
}
