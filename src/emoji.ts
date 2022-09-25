
const emojiSet: {[key: string]: string} = {
  'hmmmm': 'https://emoji.slack-edge.com/T0D0DT1F0/hmmmm/7beb6f62ba141947.png',
  'this': 'https://emoji.slack-edge.com/T0D0DT1F0/this/3c522ac8fd93caac.png',
  'thonk_derp': 'https://emoji.slack-edge.com/T0D0DT1F0/thonk_derp/fcb552bff63169b3.png',
  'yay-fox': 'https://emoji.slack-edge.com/T0D0DT1F0/yay-fox/bed4095a742619ad.gif',
  'fried_lol': 'https://emoji.slack-edge.com/T0D0DT1F0/fried_lol/44b99ca264303644.jpg',
  'stonks': 'https://emoji.slack-edge.com/T0D0DT1F0/stonks/282299594d655ec1.png',
  'msn_h': 'https://emoji.slack-edge.com/T0D0DT1F0/msn_h/d76716b0f9008e20.gif',
};

export function getEmojiList() {
  return Object.keys(emojiSet);
}

export function getImageSourceForEmoji(emoji: string): string | null {
  return emojiSet[emoji] ?? null;
}