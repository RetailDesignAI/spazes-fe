import { createSlice } from '@reduxjs/toolkit';
import { SIDEBAR_DEFAULT_WIDTH } from '@/lib/constants';

export interface IUiState {
  sidebarWidth: string;
}

const initialState: IUiState = {
  sidebarWidth: SIDEBAR_DEFAULT_WIDTH,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    resetUiState: () => initialState,
    setSidebarWidth: (state, { payload }) => {
      state.sidebarWidth = payload;
    },
  },
});

export const { resetUiState, setSidebarWidth } = uiSlice.actions;
export default uiSlice.reducer;
