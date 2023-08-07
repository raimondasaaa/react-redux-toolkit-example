import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { UserResponse, authApi } from "../../api/auth";

const selectSelf = (state: RootState) => state;

export type UserState = {
  me?: UserResponse;
};

const initialState: UserState = {
  me: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.me = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.validateToken.matchFulfilled,
      (state, { payload }) => {
        state.me = payload;
      }
    );
  },
});

export const meSelector = createSelector(selectSelf, (state) => state.user.me);

const { actions: userActions, reducer: userReducer } = userSlice;

export { userActions, userReducer };
