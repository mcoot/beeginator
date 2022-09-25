import React, { useState } from 'react';
import './Grid.css';
import GridCell from './GridCell';

type GridSelection = {row: number, col: number} | null;

interface GridProps {
  gridData: (string | null)[][];
  mouseIsDown: boolean;
  maxColumns?: number;

  onCellClick?: (row: number, col: number, emoji: string | null) => void;
  onCellDragOver?: (row: number, col: number, emoji: string | null) => void;
}

function Grid({gridData, maxColumns, mouseIsDown, onCellClick}: GridProps) {
  

  const numColumns = maxColumns ?? gridData[0]?.length ?? 1; 

  const gridStyle = {
    border: '2px solid black',
    display: 'grid',
    gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
    gridTemplateRows: `repeat(${gridData.length}, 1fr)`,
  };

  const [selected, setSelected] = useState<GridSelection>(null);

  return (
    <div 
      className='Grid' 
      style={gridStyle}
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
                  if (!mouseIsDown) {
                    return;
                  }
                  onCellClick?.(rowIdx, colIdx, cellEmoji);
                }}
                onMouseDown={() => {
                  onCellClick?.(rowIdx, colIdx, cellEmoji);
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