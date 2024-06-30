import { createSlice } from '@reduxjs/toolkit';

export interface ILoadersState {
  fullPageLoader: boolean;
}

const initialState: ILoadersState = {
  fullPageLoader: false,
};

export const projectSlice = createSlice({
  name: 'loaders',
  initialState,
  reducers: {
    resetLoadersState: () => initialState,
    setFullLoader: (state, action) => {
      state.fullPageLoader = action.payload;
    },
  },
});

export const { resetLoadersState, setFullLoader } = projectSlice.actions;
export default projectSlice.reducer;
