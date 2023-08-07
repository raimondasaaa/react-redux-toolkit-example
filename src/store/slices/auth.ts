import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
    },

    loginSucceeded: (state) => {
      state.isAuthenticated = true;
    },

    loginFailed: (state) => {
      state.isAuthenticated = false;
    },

    setToken: (state, action: PayloadAction<AuthState["token"]>) => {
      state.token = action.payload;
    },

    validateToken: (_) => {},
  },
});

const { actions: authActions, reducer: authReducer } = authSlice;

export { authActions, authReducer };
