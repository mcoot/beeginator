import React from 'react';
import Grid from './Grid';

interface ToolPaletteProps {
  mouseIsDown: boolean;
  rightMouseIsDown: boolean;

  emojiList: (string | null)[];
  columns: number;

  onPaletteSelect: (emoji: string | null) => void;
}

export function ToolPalette({
  mouseIsDown, 
  rightMouseIsDown, 
  emojiList,
  columns,
  onPaletteSelect,
}: ToolPaletteProps) {
  // Arrange emoji tools into rows
  const emojiTools: (string | null)[][] = [];
  for (let chunkIdx = 0; chunkIdx < emojiList.length; chunkIdx += columns) {
    emojiTools.push(emojiList.slice(chunkIdx, chunkIdx + columns));
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
        onCellMouseIsDown={(row, col, emoji) => {
          onPaletteSelect(emoji);
        }}
      />
    </div>
  );
}