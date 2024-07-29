import { IFeedback, IImage } from '@/pages/Project/project.types';
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
      state.images.unshift(...payload);
    },
    changeSelectedImage: (state, { payload }) => {
      state.selectedImage = payload;
    },
    changeFeedback: (state, { payload }: { payload: IFeedback }) => {
      state.images[state.selectedImage].feedback = payload;
    },
  },
});

export const { setImages, changeSelectedImage, addImages, resetProjectState, changeFeedback } = projectSlice.actions;
export default projectSlice.reducer;
