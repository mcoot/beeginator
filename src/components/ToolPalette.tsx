import React from 'react';
import { getEmojiList } from '../emoji';
import GridCell from './GridCell';

export function ToolPalette() {
  const emojiTools = [
    null,
    ...getEmojiList(),
  ];
  
  const paletteGridStyle = {
    border: '2px solid black',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
  };

  const paletteCellStyle = {
    background: 'white',
    border: '1px solid black',
  };

  return (
    <div className="ToolPalette" style={paletteGridStyle}>
      
    </div>
  );
}