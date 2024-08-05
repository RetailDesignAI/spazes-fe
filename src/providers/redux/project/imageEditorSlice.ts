import { v4 as uuidv4 } from 'uuid';
import { createSlice } from '@reduxjs/toolkit';

export enum EditorShapes {
  Rectangle = 'rectangle',
  Circle = 'circle',
  Line = 'line',
}

const DEFAULT_SHAPE_PROPS = {
  x: 0,
  y: 0,
  fill: 'white',
};

const DEFAULT_RECTANGLE = {
  ...DEFAULT_SHAPE_PROPS,
  width: 100,
  height: 100,
};

const DEFAULT_CIRCLE = {
  ...DEFAULT_SHAPE_PROPS,
  radiusX: 50,
  radiusY: 50,
  x: 50,
  y: 50,
};

export interface IShape {
  id: string;
  x: number;
  y: number;
  fill: string;
}

export interface IRectangle extends IShape {
  width: number;
  height: number;
}

export interface ICircle extends IShape {
  radiusX: number;
  radiusY: number;
}

export interface ILine {
  tool: 'pen';
  points: number[];
}

export interface IImageEditorState {
  rectangles: IRectangle[];
  circles: ICircle[];
  lines: ILine[];
  isEditModeOn: boolean;
}

const initialState: IImageEditorState = {
  rectangles: [],
  circles: [],
  lines: [],
  isEditModeOn: false,
};

export const imageEditorSlice = createSlice({
  name: 'imageEditor',
  initialState,
  reducers: {
    resetImageEditorSlice: () => initialState,
    addShape: (state, { payload }) => {
      const id = uuidv4();
      if (payload === EditorShapes.Rectangle) {
        const rectanglesLength = state.rectangles?.length || 0;
        state.rectangles =
          rectanglesLength === 0
            ? [{ ...DEFAULT_RECTANGLE, id: `${payload}_${id}` }]
            : [...state.rectangles, { ...DEFAULT_RECTANGLE, id: `${payload}_${id}` }];
      } else if (payload === EditorShapes.Circle) {
        const circlesLength = state.circles?.length || 0;
        state.circles =
          circlesLength === 0
            ? [{ ...DEFAULT_CIRCLE, id: `${payload}_${id}` }]
            : [...state.circles, { ...DEFAULT_CIRCLE, id: `${payload}_${id}` }];
      }
    },
    setShapes: (state, { payload }) => {
      const { shape, data } = payload;
      if (shape === EditorShapes.Rectangle) {
        state.rectangles = data;
      } else if (shape === EditorShapes.Circle) {
        state.circles = data;
      }
    },
    removeShape: (state, { payload }) => {
      const shape = payload.split('_')[0];
      if (shape === EditorShapes.Rectangle) {
        state.rectangles = state.rectangles.filter((shapeObj) => shapeObj.id !== payload);
      } else if (shape === EditorShapes.Circle) {
        state.circles = state.circles.filter((shapeObj) => shapeObj.id !== payload);
      }
    },
    setLines: (state, { payload }) => {
      state.lines = payload;
    },
    toggleEditMode: (state, { payload }) => {
      state.isEditModeOn = payload;
    },
  },
});

export const { resetImageEditorSlice, addShape, setShapes, removeShape, setLines, toggleEditMode } =
  imageEditorSlice.actions;
export default imageEditorSlice.reducer;
