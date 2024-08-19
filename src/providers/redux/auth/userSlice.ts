import { createSlice } from '@reduxjs/toolkit';

export interface IUserState {
  user: {
    id: string;
    email: string;
    name: string;
    profileImg?: string;
  };
}

const initialState: IUserState = {
  user: { email: '', name: '', profileImg: '', id: '' },
};

export const projectSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetLoadersState: () => initialState,
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setUserId: (state, { payload }) => {
      state.user.id = payload;
    },
    setName: (state, { payload }) => {
      state.user.name = payload;
    },
    setEmail: (state, { payload }) => {
      state.user.email = payload;
    },
    setProfileImage: (state, { payload }) => {
      state.user.profileImg = payload;
    },
  },
});

export const { resetLoadersState, setName, setEmail, setUser, setUserId, setProfileImage } = projectSlice.actions;
export default projectSlice.reducer;
