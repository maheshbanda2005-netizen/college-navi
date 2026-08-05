import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { University } from '@/types';

interface CompareState {
  universities: University[];
}

const initialState: CompareState = {
  universities: [],
};

const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    addToCompare: (state, action: PayloadAction<University>) => {
      if (state.universities.length < 4 && !state.universities.find((u) => u.id === action.payload.id)) {
        state.universities.push(action.payload);
      }
    },
    removeFromCompare: (state, action: PayloadAction<string>) => {
      state.universities = state.universities.filter((u) => u.id !== action.payload);
    },
    clearCompare: (state) => {
      state.universities = [];
    },
  },
});

export const { addToCompare, removeFromCompare, clearCompare } = compareSlice.actions;
export default compareSlice.reducer;
