import { createSlice } from '@reduxjs/toolkit';

export interface IAuthState {
  email: string;
  name: string;
}

const initialState: IAuthState = {
  email: '',
  name: '',
};

export const projectSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetLoadersState: () => initialState,
    setName: (state, { payload }) => {
      state.name = payload;
    },
    setEmail: (state, { payload }) => {
      state.email = payload;
    },
  },
});

export const { resetLoadersState, setName, setEmail } = projectSlice.actions;
export default projectSlice.reducer;
