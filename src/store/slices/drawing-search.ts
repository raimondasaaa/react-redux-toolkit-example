import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";

import {
  DrawingResponse,
  DrawingSearchResponse,
  drawingApi,
} from "../../api/drawing";

import { RootState } from "..";

export type DrawingSearchState = {
  search: string;

  selected: DrawingSearchResponse | null;

  drawing: DrawingResponse | undefined;

  options: DrawingSearchResponse[];

  related: DrawingSearchResponse[];
};

export type SwitchSelected = {
  to: "next" | "previous";
};

const initialState: DrawingSearchState = {
  search: "",
  selected: null,
  drawing: undefined,
  options: [],
  related: [],
};

export const drawingSearchSlice = createSlice({
  name: "drawingSearch",
  initialState,
  reducers: {
    init() {},

    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },

    setSelected(state, action: PayloadAction<DrawingSearchResponse | null>) {
      if (!action.payload) {
        state.search = "";
        state.selected = null;

        state.drawing = undefined;
        state.options = [];
        state.related = [];
      } else {
        state.selected = action.payload;
      }
    },

    switchSelected(_state, _action: PayloadAction<SwitchSelected>) {},

    reset(state) {
      state.search = "";
      state.selected = null;

      state.drawing = undefined;
      state.options = [];
      state.related = [];
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      drawingApi.endpoints.getDrawing.matchFulfilled,
      (state, action) => {
        state.drawing = action.payload;
      }
    ),
      builder.addMatcher(
        drawingApi.endpoints.getDrawing.matchRejected,
        (state) => {
          state.drawing = undefined;
        }
      ),
      builder.addMatcher(
        drawingApi.endpoints.search.matchFulfilled,
        (state, action) => {
          state.options = action.payload;
        }
      );
    builder.addMatcher(drawingApi.endpoints.search.matchRejected, (state) => {
      state.options = [];
    }),
      builder.addMatcher(
        drawingApi.endpoints.getRelated.matchFulfilled,
        (state, action) => {
          state.related = action.payload;
        }
      ),
      builder.addMatcher(
        drawingApi.endpoints.getRelated.matchRejected,
        (state) => {
          state.related = [];
        }
      );
  },
});

const selectSelf = (state: RootState) => state;

export const optionsSelector = createSelector(
  selectSelf,
  (state) => state.drawingSearch.options
);

export const drawingSelector = createSelector(
  selectSelf,
  (state) => state.drawingSearch.drawing
);

export const relatedSelector = createSelector(
  selectSelf,
  (state) => state.drawingSearch.related
);

const { actions: drawingSearchActions, reducer: drawingSearchReducer } =
  drawingSearchSlice;

export { drawingSearchActions, drawingSearchReducer };
