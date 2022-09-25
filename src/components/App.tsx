import React, { useState, useRef, useEffect } from 'react';
import Grid from './Grid';
import './App.css';
import { useAppState } from '../state-store';
import { ToolPalette } from './ToolPalette';

function App() {
  // We need to know if mouse is down anywhere on the app
  const [mouseIsDown, setMouseIsDown] = useState(false);
  const [rightMouseIsDown, setRightMouseIsDown] = useState(false);
  const mouseIsDownRef = useRef<any>(null);
  useEffect(() => {
    const globalMouseDownHandler = (ev: MouseEvent) => {
      if (!mouseIsDownRef.current?.contains(ev.target)) {
        if (ev.button === 0) {
          setMouseIsDown(true);
        } else if (ev.button === 2) {
          setRightMouseIsDown(true);
        }
      }
    };
    const globalMouseUpHandler = (ev: MouseEvent) => {
      if (!mouseIsDownRef.current?.contains(ev.target)) {
        if (ev.button === 0) {
          setMouseIsDown(false);
        } else if (ev.button === 2) {
          setRightMouseIsDown(false);
        }
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
  const update = useAppState((state) => state.update);

  return (
    <div className="App">
      <header className="App-header">
        <Grid 
          gridData={gridData}
          mouseIsDown={mouseIsDown}
          rightMouseIsDown={rightMouseIsDown}
          onCellClick={(row, col) => {
            console.log(`Updating r${row}c${col} with ${currentTool}`);
            updateWithCurrentTool(row, col);
          }}
          onCellRightClick={(row, col) => {
            console.log(`Clearing r${row}c${col}`);
            update(row, col, null);
          }}
        />
        <ToolPalette
          mouseIsDown={mouseIsDown}
          rightMouseIsDown={rightMouseIsDown}
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
