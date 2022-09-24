import React, { useState } from 'react';
import './Grid.css';
import GridCell from './GridCell';

type GridSelection = {row: number, col: number} | null;

function Grid() {
  const gridData = [['hmmmm', null, 'thonk_derp', null], [null, null, null, null], [null, 'this', null, null]];

  const [selected, setSelected] = useState<GridSelection>(null);

  return (
    <div className='Grid'>
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
              />
            );
          });
        })
      }
    </div>
  ); 
}

export default Grid;