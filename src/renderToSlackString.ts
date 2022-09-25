export function renderToSlackString(gridData: (string | null)[][], blankEmoji: string): string {
  let result = '';

  for (const row of gridData) {
    result = result.concat(...row.map((emoji) => emoji ? `:${emoji}:` : `:${blankEmoji}:`), '\n');
  }

  return result;
}