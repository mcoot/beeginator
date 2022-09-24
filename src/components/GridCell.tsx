import React from 'react';
import './GridCell.css';

interface GridCellProps {
  row: number;
  column: number;
  emojiName: string | null;
  selected: boolean;

  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function getEmojiImgSrc(emojiName: string | null): string | null {
  switch (emojiName) {
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

function GridCell({row, column, emojiName, selected, onMouseEnter, onMouseLeave}: GridCellProps) {
  const cellStyle = {
    gridColumn: column + 1,
    gridRow: row + 1,
    background: 'white',
  };

  const emojiImgSrc = getEmojiImgSrc(emojiName);

  const contentStyle = {
    backgroundImage: `url("${emojiImgSrc}")`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 50%',
  };

  return (
    <div style={cellStyle} className='GridCell' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="GridCellContent" style={contentStyle}>
      </div> 
      {
        selected && <div className="GridCellSelectionOverlay" />
      }
    </div>
  );
}

export default GridCell;