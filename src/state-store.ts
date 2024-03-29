import create from 'zustand';

export interface AppState {
  gridData: (string | null)[][];
  currentTool: string | null;
  currentPaletteFilter: string;

  update: (rowToUpdate: number, colToUpdate: number, newEmoji: string | null) => void;
  updateWithCurrentTool: (rowToUpdate: number, colToUpdate: number) => void;
  setTool: (newEmojiTool: string | null) => void;
  setPaletteFilter: (newFilter: string) => void;
}

function updateGridData<T>(
  gridData: T[][], 
  rowToUpdate: number, 
  colToUpdate: number, 
  newValue: T
) {
  return gridData.map((row, rowIdx) => 
    row.map((cell, colIdx) => 
      rowIdx === rowToUpdate && colIdx === colToUpdate ? 
        newValue : 
        cell
    )
  );
}

export const useAppState = create<AppState>()((set) => ({
  gridData: Array(20).fill(Array(20).fill(null)),
  currentTool: null,
  currentPaletteFilter: '',

  update: (rowToUpdate, colToUpdate, newEmoji) => set((state) => ({
    gridData: updateGridData(state.gridData, rowToUpdate, colToUpdate, newEmoji),
  })),
  updateWithCurrentTool: (rowToUpdate, colToUpdate) => set((state) => ({
    gridData: updateGridData(state.gridData, rowToUpdate, colToUpdate, state.currentTool),
  })),
  setTool: (newEmojiTool) => set({ currentTool: newEmojiTool }),
  setPaletteFilter: (newFilter) => set({currentPaletteFilter: newFilter}),
}));