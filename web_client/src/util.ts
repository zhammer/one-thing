export function getRandomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function randomWholeNumber(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min));
}

/**
 * range(4) -> [0, 1, 2, 3]
 * @param count Length of range
 */
export function range(count: number): number[] {
  let out: number[] = [];
  for (let i = 0; i < count; i++) {
    out.push(i);
  }
  return out;
}
