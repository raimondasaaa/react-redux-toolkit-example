import { createSlice } from "@reduxjs/toolkit";

export type LayoutState = {
  name: "loading" | "login" | "application";
};

const initialState: LayoutState = {
  name: "loading",
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    switchToLoading: (state) => {
      state.name = "loading";
    },
    switchToLogin: (state) => {
      state.name = "login";
    },
    switchToApplication: (state) => {
      state.name = "application";
    },
  },
});

const { actions: layoutActions, reducer: layoutReducer } = layoutSlice;

export { layoutActions, layoutReducer };
