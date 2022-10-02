
import * as emojiApiData from './emoji-uqcs.json';

// const emojiSet: {[key: string]: string} = {
//   'hmmmm': 'https://emoji.slack-edge.com/T0D0DT1F0/hmmmm/7beb6f62ba141947.png',
//   'this': 'https://emoji.slack-edge.com/T0D0DT1F0/this/3c522ac8fd93caac.png',
//   'thonk_derp': 'https://emoji.slack-edge.com/T0D0DT1F0/thonk_derp/fcb552bff63169b3.png',
//   'yay-fox': 'https://emoji.slack-edge.com/T0D0DT1F0/yay-fox/bed4095a742619ad.gif',
//   'fried_lol': 'https://emoji.slack-edge.com/T0D0DT1F0/fried_lol/44b99ca264303644.jpg',
//   'stonks': 'https://emoji.slack-edge.com/T0D0DT1F0/stonks/282299594d655ec1.png',
//   'msn_h': 'https://emoji.slack-edge.com/T0D0DT1F0/msn_h/d76716b0f9008e20.gif',
// };

interface EmojiData {
  imageUrls: {[key: string]: string};
  aliases: {[key: string]: string};
  reverseAliases: {[key: string]: string[]};
}

function parseEmojiApiData(data: {emoji: {[key: string]: string}}): EmojiData {
  const imageUrls: {[key: string]: string} = {};
  const aliases: {[key: string]: string} = {};
  const reverseAliases: {[key: string]: string[]} = {};

  for (const [k, v] of Object.entries(data.emoji)) {
    if (v.startsWith('alias:')) {
      const target = v.slice('alias:'.length);
      aliases[k] = target;
      if (reverseAliases[target]) {
        reverseAliases[target].push(k);
      } else {
        reverseAliases[target] = [k];
      }
    } else {
      imageUrls[k] = v;
    }
  }

  return {imageUrls, aliases, reverseAliases};
}

const emojiData = parseEmojiApiData(emojiApiData);
const emojiKeys = Object.keys(emojiData.imageUrls);

export function getEmojiList(): string[] {
  return emojiKeys;
}

// TODO: Caching!
export function getEmojiWithFilter(filter: string): string[] {
  return emojiKeys.filter((emoji) => 
    emoji.includes(filter) 
  || (emojiData.reverseAliases[emoji] ?? []).some((alias) => alias.includes(filter))
  );
}

export function sliceByCount<T>(list: T[], start: number, count: number) {
  return list.slice(start, Math.min(start + count, list.length));
}

export function getImageSourceForEmoji(emoji: string): string | null {
  let effectiveEmojiName: string | null = emoji;
  if (emojiData.aliases[emoji]) {
    effectiveEmojiName = emojiData.aliases[emoji];
  }
  return emojiData.imageUrls[effectiveEmojiName] ?? null;
}