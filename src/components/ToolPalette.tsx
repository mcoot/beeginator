import React from 'react';
import { getEmojiList } from '../emoji';
import Grid from './Grid';

interface ToolPaletteProps {
  mouseIsDown: boolean;

  onPaletteSelect: (emoji: string | null) => void;
}

export function ToolPalette({mouseIsDown, onPaletteSelect}: ToolPaletteProps) {
  const emojiTools = [[
    null,
    ...getEmojiList(),
  ]];
  
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
        maxColumns={2}
        onCellClick={(row, col, emoji) => {
          onPaletteSelect(emoji);
        }}
      />
    </div>
  );
}