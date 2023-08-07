import { ListenerMiddlewareInstance } from "@reduxjs/toolkit";
import { push } from "redux-first-history";

import { layoutActions } from "../slices/layout";

import { appActions } from "../slices/app";
import { authActions } from "../slices/auth";

import { RootState } from "..";

export const initListener = (listener: ListenerMiddlewareInstance) => {
  listener.startListening({
    actionCreator: appActions.init,
    effect: async (_, listenerApi) => {
      const state: RootState = listenerApi.getState() as RootState;

      await listenerApi.delay(1000);

      const token = localStorage.getItem("token");

      if (!token) {
        listenerApi.dispatch(authActions.setToken(null));
        listenerApi.dispatch(layoutActions.switchToLogin());

        listenerApi.dispatch(push("/login"));

        listenerApi.dispatch(appActions.initCompleted());
        return;
      }

      listenerApi.dispatch(authActions.setToken(token));
      listenerApi.dispatch(layoutActions.switchToApplication());

      if (!state.router.location?.pathname.startsWith("/drawing-search")) {
        listenerApi.dispatch(push("/drawing-search"));
      }

      listenerApi.dispatch(appActions.initCompleted());
    },
  });
};
