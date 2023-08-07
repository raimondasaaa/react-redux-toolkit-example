import {
  AnyAction,
  ListenerEffectAPI,
  ListenerMiddlewareInstance,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { LOCATION_CHANGE, push } from "redux-first-history";
import queryString from "query-string";

import {
  SwitchSelected,
  drawingSearchActions,
  drawingSelector,
  relatedSelector,
} from "../slices/drawing-search";

import { RootState } from "..";
import { toast } from "react-toastify";
import { drawingApi } from "../../api/drawing";

export const drawingSearchListener = (listener: ListenerMiddlewareInstance) => {
  function changeSelectedDrawing(
    listenerApi: ListenerEffectAPI<
      unknown,
      ThunkDispatch<unknown, unknown, AnyAction>,
      unknown
    >
  ) {
    const state = listenerApi.getState() as RootState;

    const location = state.router.location;
    const drawingSearch = state.drawingSearch;

    if (location?.pathname.startsWith("/drawing-search") && location.search) {
      const parsedQuery = queryString.parse(location.search);

      if (
        !drawingSearch.search ||
        drawingSearch.search !== parsedQuery.title ||
        drawingSearch.selected?.revision !== parsedQuery.revision
      )
        listenerApi.dispatch(
          drawingSearchActions.setSearch(parsedQuery.title as string)
        );

      if (
        !drawingSearch.selected ||
        drawingSearch.selected.title !== parsedQuery.title ||
        drawingSearch.selected.revision !== parsedQuery.revision
      ) {
        listenerApi.dispatch(
          drawingSearchActions.setSelected({
            title: parsedQuery.title as string,
            revision: parsedQuery.revision as string,
          } as any)
        );
      }
    } else if (location?.pathname.startsWith("/drawing-search")) {
      if (drawingSearch.search)
        listenerApi.dispatch(drawingSearchActions.setSearch(""));

      if (drawingSearch.selected)
        listenerApi.dispatch(drawingSearchActions.setSelected(null));
    }
  }

  listener.startListening({
    actionCreator: drawingSearchActions.init,
    effect: (_, listenerApi) => changeSelectedDrawing(listenerApi),
  });

  listener.startListening({
    type: LOCATION_CHANGE,
    effect: (_, listenerApi) => changeSelectedDrawing(listenerApi),
  });

  listener.startListening({
    matcher: drawingApi.endpoints.getDrawing.matchRejected,
    effect: (action) => {
      toast.error(
        (action.payload?.data as Record<string, unknown>)?.message as string
      );
    },
  });

  listener.startListening({
    actionCreator: drawingSearchActions.setSelected,
    effect: (action, listenerApi) => {
      const state = listenerApi.getState() as RootState;

      const location = state.router.location;

      if (action.payload) {
        const newLocationPathname = `${location?.pathname}?title=${action.payload.title}&revision=${action.payload.revision}`;

        if (`${location?.pathname}${location?.search}` === newLocationPathname)
          return;

        toast.success(
          `${action.payload.title} rev.: ${action.payload.revision}`
        );

        listenerApi.dispatch(push(newLocationPathname));
      } else {
        listenerApi.dispatch(push(location?.pathname as string));
      }
    },
  });

  listener.startListening({
    actionCreator: drawingSearchActions.switchSelected,
    effect: (action, listenerApi) => {
      const state = listenerApi.getState() as RootState;

      const drawing = drawingSelector(state);
      const related = relatedSelector(state);

      if (!drawing) return;
      if (!related.length) return;

      const index = related.findIndex((item) => item.id === drawing.id);

      const selectedSwitchStrategies: Record<SwitchSelected["to"], () => void> =
        {
          next: () => {
            if (index + 1 > related.length - 1) return;
            listenerApi.dispatch(
              drawingSearchActions.setSelected(related[index + 1])
            );
          },
          previous: () => {
            if (index - 1 < 0) return;
            listenerApi.dispatch(
              drawingSearchActions.setSelected(related[index - 1])
            );
          },
        };

      selectedSwitchStrategies?.[action.payload.to]?.();
    },
  });
};
