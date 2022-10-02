import React, { useState } from 'react';
import './Grid.css';
import GridCell from './GridCell';

type GridSelection = {row: number, col: number} | null;

interface GridProps {
  gridData: (string | null)[][];
  mouseIsDown: boolean;
  rightMouseIsDown: boolean;

  onCellMouseIsDown: (row: number, col: number, emoji: string | null) => void;
  onCellRightMouseIsDown?: (row: number, col: number, emoji: string | null) => void;
}

function Grid({
  gridData, 
  mouseIsDown, 
  rightMouseIsDown, 
  onCellMouseIsDown, 
  onCellRightMouseIsDown
}: GridProps) {
  const gridStyle: React.CSSProperties = {
    border: '2px solid black',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 1fr)',
    gridTemplateRows: 'repeat(auto-fill, 1fr)',
  };

  const [selected, setSelected] = useState<GridSelection>(null);

  return (
    <div 
      className='Grid' 
      style={gridStyle}
      onContextMenu={(ev) => ev.preventDefault()}
    >
      {
        gridData.map((rowData, rowIdx) => {
          return rowData.map((cellEmoji, colIdx) => {
            const isSelected = selected && selected.row === rowIdx && selected.col === colIdx;

            return (
              <GridCell 
                key={`cell-${colIdx}-${rowIdx}`} 
                row={rowIdx} 
                column={colIdx} 
                emoji={cellEmoji}
                selected={isSelected ?? false}
                onMouseEnter={() => {
                  setSelected({row: rowIdx, col: colIdx});

                  if (mouseIsDown) {
                    onCellMouseIsDown(rowIdx, colIdx, cellEmoji);
                  } else if (rightMouseIsDown) {
                    onCellRightMouseIsDown?.(rowIdx, colIdx, cellEmoji);
                  }
                }}
                onMouseDown={(ev: MouseEvent) => {
                  if (ev.button === 0) {
                    onCellMouseIsDown(rowIdx, colIdx, cellEmoji);
                  } else if (ev.button === 2) {
                    onCellRightMouseIsDown?.(rowIdx, colIdx, cellEmoji);
                  }
                }}
                onMouseLeave={() => {
                  setSelected(null);
                }}
              />
            );
          });
        })
      }
    </div>
  ); 
}

export default Grid;