import React from 'react';
import Grid from './Grid';
import './App.css';
import { useAppState } from '../state-store';
import { ToolPalette } from './ToolPalette';

function App() {
  const currentTool = useAppState((state) => state.currentTool);
  const gridData = useAppState((state) => state.gridData);
  const setTool = useAppState((state) => state.setTool);
  const updateWithCurrentTool = useAppState((state) => state.updateWithCurrentTool);

  return (
    <div className="App">
      <header className="App-header">
        <Grid 
          gridData={gridData}
          onCellClick={(row, col) => {
            console.log(`Updating r${row}c${col} with ${currentTool}`);
            updateWithCurrentTool(row, col);
          }}
        />
        <ToolPalette
          onPaletteSelect={(emoji) => {
            setTool(emoji);
            console.log(`set tool to ${emoji}`);
          }}
        />
      </header>
    </div>
  );
}

export default App;
