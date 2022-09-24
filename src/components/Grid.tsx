import React, { useState } from 'react';
import { useAppState } from '../state-store';
import './Grid.css';
import GridCell from './GridCell';

type GridSelection = {row: number, col: number} | null;

interface GridProps {
  gridData: (string | null)[][];
  maxColumns?: number;

  onCellClick: (row: number, col: number, emoji: string | null) => void;
}

function Grid({gridData, maxColumns, onCellClick}: GridProps) {
  const numColumns = maxColumns ?? gridData[0]?.length ?? 1; 

  const gridStyle = {
    border: '2px solid black',
    display: 'grid',
    gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
    gridTemplateRows: `repeat(${gridData.length}, 1fr)`,
  };

  const [selected, setSelected] = useState<GridSelection>(null);

  return (
    <div className='Grid' style={gridStyle}>
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
                }}
                onMouseLeave={() => {
                  setSelected(null);
                }}
                onClick={() => {
                  if (!isSelected) {
                    return;
                  }
                  onCellClick(rowIdx, colIdx, cellEmoji);
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