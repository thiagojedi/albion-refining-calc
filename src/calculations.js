//@ts-check
/**
 * @param {number} rate
 * @returns {number}
 */
export const rounds = rate => Math.log2(rate);

/**
 * @param {number} price
 * @param {number} tax
 * @returns {number}
 */
export const costByTax = (price, tax) => (price * tax * 5) / 100;

/**
 * @param {number} quantity
 * @param {number} rate
 * @returns {number}
 */
export function totalWithReturnRate(quantity, rate) {
  if (rate === 0) return quantity;

  const r = rate / 100;

  return Math.round(quantity * ((Math.pow(r, rounds(rate)) - 1) / (r - 1)));
}