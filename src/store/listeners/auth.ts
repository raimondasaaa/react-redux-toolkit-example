import { ListenerMiddlewareInstance } from "@reduxjs/toolkit";
import { LOCATION_CHANGE, push } from "redux-first-history";

import { authApi } from "../../api/auth";

import { authActions } from "../slices/auth";
import { layoutActions } from "../slices/layout";

import { RootState } from "..";
import { toast } from "react-toastify";
import { userActions } from "../slices/user";

export const authListener = (listener: ListenerMiddlewareInstance) => {
  listener.startListening({
    matcher: authApi.endpoints.login.matchRejected,
    effect: async (_, listenerApi) => {
      const state: RootState = listenerApi.getState() as RootState;

      if (state.auth.isAuthenticated) {
        listenerApi.dispatch(authActions.loginFailed());
      }

      if (state.layout.name !== "login") {
        listenerApi.dispatch(layoutActions.switchToLogin());
      }

      toast.warning("Blogi prisijungimo duomenys");
    },
  });

  listener.startListening({
    matcher: authApi.endpoints.login.matchFulfilled,
    effect: async (action, listenerApi) => {
      localStorage.setItem("token", action.payload.token);
      listenerApi.dispatch(authActions.setToken(action.payload.token));

      listenerApi.dispatch(authActions.loginSucceeded());

      listenerApi.dispatch(layoutActions.switchToLoading());
      await listenerApi.delay(1000);

      listenerApi.dispatch(layoutActions.switchToApplication());

      listenerApi.dispatch(push("/drawing-search"));

      toast.success(
        `Labas, ${action.payload.profile.firstname} ${action.payload.profile.lastname}!`
      );
    },
  });

  listener.startListening({
    actionCreator: authActions.logout,
    effect: async (_, listenerApi) => {
      localStorage.removeItem("token");

      listenerApi.dispatch(layoutActions.switchToLoading());
      listenerApi.dispatch(authActions.setToken(null));

      await listenerApi.delay(1000);

      listenerApi.dispatch(layoutActions.switchToLogin());

      listenerApi.dispatch(push("/login"));

      listenerApi.dispatch(userActions.reset());
    },
  });

  listener.startListening({
    type: LOCATION_CHANGE,
    effect: async (_, listenerApi) => {
      const state = listenerApi.getState() as RootState;

      const { token, isAuthenticated } = state?.auth;

      if (token && isAuthenticated) {
        const mutation = authApi.endpoints.validateToken.useMutation;
        mutation();
      }
    },
  });
};
