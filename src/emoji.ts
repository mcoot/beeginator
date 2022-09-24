
export function getEmojiList() {
  return [
    'hmmmm',
    'this',
    'thonk_derp'
  ];
}

export function getImageSourceForEmoji(emoji: string): string | null {
  switch (emoji) {
  case 'hmmmm':
    return 'https://emoji.slack-edge.com/T0D0DT1F0/hmmmm/7beb6f62ba141947.png';
  case 'this':
    return 'https://emoji.slack-edge.com/T0D0DT1F0/this/3c522ac8fd93caac.png';
  case 'thonk_derp':
    return 'https://emoji.slack-edge.com/T0D0DT1F0/thonk_derp/fcb552bff63169b3.png';
  default:
    return null;
  }
}