import React, { useState } from 'react';
import { useAppState } from '../state-store';
import './Grid.css';
import GridCell from './GridCell';

type GridSelection = {row: number, col: number} | null;

interface GridProps {
  onCellClick: (row: number, col: number) => void;
}

function Grid({onCellClick}: GridProps) {
  const gridData = useAppState((state) => state.gridData);

  const gridStyle = {
    border: '2px solid black',
    display: 'grid',
    gridTemplateColumns: `repeat(${gridData[0]?.length ?? 1}, 1fr)`,
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
                emojiName={cellEmoji}
                selected={isSelected ?? false}
                onMouseEnter={() => {
                  setSelected({row: rowIdx, col: colIdx});
                }}
                onMouseLeave={() => {
                  setSelected(null);
                }}
                onClick={() => {
                  if (!selected) {
                    return;
                  }

                  onCellClick(selected.row, selected.col);
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