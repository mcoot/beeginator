
export function getEmojiList() {
  return [
    'hmmmm',
    'this',
    'thonk_derp',
    'yay-fox',
    'fried_lol',
    'stonks',
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
  case 'yay-fox':
    return 'https://emoji.slack-edge.com/T0D0DT1F0/yay-fox/bed4095a742619ad.gif';
  case 'fried_lol':
    return 'https://emoji.slack-edge.com/T0D0DT1F0/fried_lol/44b99ca264303644.jpg';
  case 'stonks':
    return 'https://emoji.slack-edge.com/T0D0DT1F0/stonks/282299594d655ec1.png';
  default:
    return null;
  }
}