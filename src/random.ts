export const random = (seed = Date.now()) =>
  (((1103515245 * seed + 12345) % 0x80000000) >>> 16) / 0x8000
