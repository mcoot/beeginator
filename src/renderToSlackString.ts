function findBounds(gridData: (string | null)[][]): {left: number; top: number; right: number; bottom: number} {
  let left = -1;
  let top = -1;
  let right = -1;
  let bottom = -1;
  for (let y = 0; y < gridData.length; y++) {
    for (let x = 0; x < gridData[y].length; x++) {
      if (gridData[y][x]) {
        if (top === -1 || y < top) {
          top = y;
        }
        if (bottom === -1 || y > bottom) {
          bottom = y;
        }
        if (left === -1 || x < left) {
          left = x;
        }
        if (right === -1 || x > right) {
          right = x;
        }
      }
    }
  }

  return {left, top, right, bottom};
}

export function renderToSlackString(gridData: (string | null)[][], blankEmoji: string): string {
  let result = '';

  const {left, top, right, bottom} = findBounds(gridData);

  for (const row of gridData.slice(top, bottom + 1)) {
    result = result.concat(...row.slice(left, right + 1).map((emoji) => emoji ? `:${emoji}:` : `:${blankEmoji}:`), '\n');
  }

  return result;
}