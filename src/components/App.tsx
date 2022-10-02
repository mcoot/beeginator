import React, { useState, useRef, useEffect } from 'react';
import Grid from './Grid';
import './App.css';
import { useAppState } from '../state-store';
import { ToolPalette } from './ToolPalette';
import { renderToSlackString } from '../renderToSlackString';
import { getEmojiWithFilter, sliceByCount } from '../emoji';

function App() {
  const [paletteEmojiIdx, setPaletteEmojiIdx] = useState(0);
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
  const currentPaletteFilter = useAppState((state) => state.currentPaletteFilter);
  const gridData = useAppState((state) => state.gridData);
  const setTool = useAppState((state) => state.setTool);
  const setPaletteFilter = useAppState((state) => state.setPaletteFilter);
  const updateWithCurrentTool = useAppState((state) => state.updateWithCurrentTool);
  const update = useAppState((state) => state.update);

  const paletteColumns = 4;
  const palettePageSize = paletteColumns * 16;
  const paletteEmoji = getEmojiWithFilter(currentPaletteFilter);
  const paletteEmojiPage = sliceByCount(paletteEmoji, paletteEmojiIdx, palettePageSize);
  
  /*

  16 per page

  43 items

  0-15
  16-31
  32-43

  */

  const paletteEmojiPageCount = Math.ceil((paletteEmoji.length) / palettePageSize);
  const paletteEmojiPageNumber = Math.floor((paletteEmojiIdx/paletteEmoji.length) * paletteEmojiPageCount) + 1;

  return (
    <div className="App">
      <div className="Palette">
        <input value={currentPaletteFilter} onChange={(event) => {
          setPaletteFilter(event.target.value);
          // Reset our indexing through the pages since the contents of the palette have changed
          setPaletteEmojiIdx(0);
        }} />
        <ToolPalette
          mouseIsDown={mouseIsDown}
          rightMouseIsDown={rightMouseIsDown}
          emojiList={paletteEmojiPage}
          columns={paletteColumns}
          onPaletteSelect={(emoji) => {
            setTool(emoji);
            console.log(`set tool to ${emoji}`);
          }}
        />
        <span>:{currentTool}:</span>
        <div className="PalettePrevNext">
          <span>{paletteEmojiPageNumber}/{paletteEmojiPageCount}</span>
          <button onClick={() => {
            setPaletteEmojiIdx(Math.max(0, paletteEmojiIdx - palettePageSize));
          }}>Prev</button>
          <button onClick={() => {
            if (paletteEmojiIdx + palettePageSize < paletteEmoji.length) {
              setPaletteEmojiIdx(paletteEmojiIdx + palettePageSize);
            }
            
          }}>Next</button>
        </div>
      </div>
      <Grid 
        gridData={gridData}
        mouseIsDown={mouseIsDown}
        rightMouseIsDown={rightMouseIsDown}
        onCellMouseIsDown={(row, col) => {
          updateWithCurrentTool(row, col);
        }}
        onCellRightMouseIsDown={(row, col) => {
          update(row, col, null);
        }}
      />
      <button
        onClick={() => {
          alert(renderToSlackString(gridData, 'github_square1'));
        }}
      >Render</button>
    </div>
  );
}

export default App;
