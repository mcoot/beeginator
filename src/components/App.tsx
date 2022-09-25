import React, { useState, useRef, useEffect } from 'react';
import Grid from './Grid';
import './App.css';
import { useAppState } from '../state-store';
import { ToolPalette } from './ToolPalette';

function App() {
  // We need to know if mouse is down anywhere on the app
  const [mouseIsDown, setMouseIsDown] = useState(false);
  const mouseIsDownRef = useRef<any>(null);
  useEffect(() => {
    const globalMouseDownHandler = (ev: MouseEvent) => {
      if (!mouseIsDownRef.current?.contains(ev.target)) {
        console.log('Mouse down yo');
        setMouseIsDown(true);
      }
    };
    const globalMouseUpHandler = (ev: MouseEvent) => {
      if (!mouseIsDownRef.current?.contains(ev.target)) {
        console.log('Mouse up yo');
        setMouseIsDown(false);
      }
    };

    document.addEventListener('mousedown', globalMouseDownHandler);
    document.addEventListener('mouseup', globalMouseUpHandler);
    return () => {
      document.removeEventListener('mousedown', globalMouseDownHandler);
      document.removeEventListener('mouseup', globalMouseUpHandler);
    };
  }, [mouseIsDownRef]);

  const currentTool = useAppState((state) => state.currentTool);
  const gridData = useAppState((state) => state.gridData);
  const setTool = useAppState((state) => state.setTool);
  const updateWithCurrentTool = useAppState((state) => state.updateWithCurrentTool);

  return (
    <div className="App">
      <header className="App-header">
        <Grid 
          gridData={gridData}
          mouseIsDown={mouseIsDown}
          onCellClick={(row, col) => {
            console.log(`Updating r${row}c${col} with ${currentTool}`);
            updateWithCurrentTool(row, col);
          }}
        />
        <ToolPalette
          mouseIsDown={mouseIsDown}
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
