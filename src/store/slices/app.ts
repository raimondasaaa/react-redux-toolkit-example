import { createSlice } from "@reduxjs/toolkit";

export type AppState = {
  isLoading: boolean;
};

const initialState: AppState = {
  isLoading: true,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    init: (_) => {},

    setToLoading: (state) => {
      state.isLoading = true;
    },

    setToNotLoading: (state) => {
      state.isLoading = false;
    },

    initCompleted: (_) => {},
  },
});

const { reducer: appReducer, actions: appActions } = appSlice;

export { appReducer, appActions };
