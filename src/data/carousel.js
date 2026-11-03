// A positive index keeps previous/next working across either end of the list.
export function getProductIndex(step, count) {
  if (!count) return 0;
  return ((step % count) + count) % count;
}

// Positions form a shallow curve: large at the centre, smaller at the edges.
const positions = [
  { x: 0, y: 0, scale: 1, opacity: 1 },
  { x: 20, y: 0.5, scale: 0.44, opacity: 0.42 },
  { x: 34, y: 8.5, scale: 0.33, opacity: 0.3 },
  { x: 55, y: 15, scale: 0.25, opacity: 0.22 },
  { x: 68, y: 21, scale: 0.2, opacity: 0 },
];

export function getCarouselSlides(step, categories) {
  if (!categories.length) return [];
  // Repeat the small catalog around the circle for a continuous loop.
  // The outermost tiles are invisible, ready to enter on the next click.
  return Array.from({ length: 9 }, (_, slot) => {
    const offset = slot - 4;
    const index = getProductIndex(step + offset, categories.length);
    const position = positions[Math.abs(offset)];
    return {
      key: step + offset,
      offset,
      index,
      category: categories[index],
      position: { ...position, x: position.x * Math.sign(offset) },
    };
  });
}
