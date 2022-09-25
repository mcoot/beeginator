import React from 'react';
import { getEmojiList } from '../emoji';
import Grid from './Grid';

interface ToolPaletteProps {
  mouseIsDown: boolean;
  rightMouseIsDown: boolean;

  onPaletteSelect: (emoji: string | null) => void;
}

export function ToolPalette({mouseIsDown, rightMouseIsDown, onPaletteSelect}: ToolPaletteProps) {
  // Arrange emoji tools into rows of 2
  const rawEmojiList = getEmojiList();
  const emojiTools: (string | null)[][] = [];
  for (let chunkIdx = 0; chunkIdx < rawEmojiList.length; chunkIdx += 2) {
    emojiTools.push(rawEmojiList.slice(chunkIdx, chunkIdx + 2));
  }
  
  // const paletteGridStyle = {
  //   border: '2px solid black',
  //   display: 'grid',
  //   gridTemplateColumns: 'repeat(2, 1fr)',
  // };

  // const paletteCellStyle = {
  //   background: 'white',
  //   border: '1px solid black',
  // };

  return (
    <div className="ToolPalette">
      <Grid
        gridData={emojiTools}
        mouseIsDown={mouseIsDown}
        rightMouseIsDown={rightMouseIsDown}
        onCellClick={(row, col, emoji) => {
          onPaletteSelect(emoji);
        }}
      />
    </div>
  );
}