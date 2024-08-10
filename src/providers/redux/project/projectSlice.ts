import { DropdownValues, IImage } from '@/pages/Project/project.types';
import { createSlice } from '@reduxjs/toolkit';

export interface IProjectState {
  selectedImage: number;
  images: IImage[];
  dropdownValue: DropdownValues;
}

const initialState: IProjectState = {
  selectedImage: 0,
  images: [],
  dropdownValue: DropdownValues.Prompt,
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
    changeDropdownValue: (state, { payload }: { payload: DropdownValues }) => {
      state.dropdownValue = payload;
    },
  },
});

export const { setImages, changeSelectedImage, addImages, resetProjectState, changeDropdownValue } = projectSlice.actions;
export default projectSlice.reducer;
