import { IImage } from '@/pages/Project/project.types';
import { createSlice } from '@reduxjs/toolkit';

export interface IProjectState {
  selectedImage: number;
  images: IImage[];
}

const initialState: IProjectState = {
  selectedImage: 0,
  images: [],
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    resetProjectState: () => initialState,
    setImages: (state, { payload }) => {
      state.images = payload;
    },
    addImages: (state, { payload }) => {
      state.images.push(...payload);
    },
    changeSelectedImage: (state, { payload }) => {
      state.selectedImage = payload;
    },
  },
});

export const { setImages, changeSelectedImage, addImages, resetProjectState } = projectSlice.actions;
export default projectSlice.reducer;
