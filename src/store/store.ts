import { configureStore } from "@reduxjs/toolkit";
import { createBrowserHistory } from "history";
import { createReduxHistoryContext } from "redux-first-history";

import { api } from "../api";

import { appActions, appReducer } from "./slices/app";
import { authReducer } from "./slices/auth";
import { layoutReducer } from "./slices/layout";

import { listener } from "./listener";
import { drawingSearchReducer } from "./slices/drawing-search";
import { userReducer } from "./slices/user";

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({ history: createBrowserHistory() });

const rootReducer = {
  [api.reducerPath]: api.reducer,
  router: routerReducer,
  app: appReducer,
  auth: authReducer,
  layout: layoutReducer,
  drawingSearch: drawingSearchReducer,
  user: userReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(routerMiddleware)
      .concat(api.middleware)
      .concat(listener.middleware),
});

export const history = createReduxHistory(store);

store.dispatch(appActions.init());

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
