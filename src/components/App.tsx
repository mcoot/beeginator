import React from 'react';
import Grid from './Grid';
import './App.css';
import { useAppState } from '../state-store';
import { ToolPalette } from './ToolPalette';

function App() {
  const currentTool = useAppState((state) => state.currentTool);
  const setTool = useAppState((state) => state.setTool);
  const updateWithCurrentTool = useAppState((state) => state.updateWithCurrentTool);

  return (
    <div className="App">
      <header className="App-header">
        <Grid 
          onCellClick={(row, col) => {
            updateWithCurrentTool(row, col);
          }}
        />
        <ToolPalette />
        {/* <button onClick={() => {
          switch (currentTool) {
          case null:
            setTool('hmmmm');
            break;
          case 'hmmmm':
            setTool('thonk_derp');
            break;
          case 'thonk_derp':
            setTool('this');
            break;
          default:
            setTool(null);
          }
          
        }}>Switch tool (currently: {currentTool ?? '<clear>'})</button> */}
      </header>
    </div>
  );
}

export default App;
