import React from 'react';
import { getImageSourceForEmoji } from '../emoji';
import './GridCell.css';

interface GridCellProps {
  row: number;
  column: number;
  emoji: string | null;
  selected: boolean;

  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

function GridCell({row, column, emoji, selected, onMouseEnter, onMouseLeave, onClick}: GridCellProps) {
  const cellStyle = {
    gridColumn: column + 1,
    gridRow: row + 1,
    background: 'white',
  };

  const emojiImgSrc = emoji ?getImageSourceForEmoji(emoji) : null;

  const contentStyle = {
    backgroundImage: `url("${emojiImgSrc}")`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 50%',
  };

  return (
    <div 
      style={cellStyle} 
      className='GridCell' 
      onMouseEnter={onMouseEnter} 
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div className="GridCellContent" style={contentStyle}>
      </div> 
      {
        selected && <div className="GridCellSelectionOverlay" />
      }
    </div>
  );
}

export default GridCell;