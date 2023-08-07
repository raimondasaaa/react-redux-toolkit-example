import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../store";
import {
  drawingSearchActions,
  drawingSelector,
  optionsSelector,
  relatedSelector,
} from "../store/slices/drawing-search";

import {
  DrawingSearchResponse,
  useGetDrawingQuery,
  useSearchQuery,
  useGetRelatedQuery,
} from "../api/drawing";

export const useDrawingSearch = () => {
  const dispatch = useDispatch();

  const { search, selected } = useSelector(
    (state: RootState) => state.drawingSearch
  );

  const searchArgs = {
    name: search,
  };

  const drawingArgs = {
    name: selected?.title as string,
    revision: selected?.revision,
  };

  const relatedArgs = {
    name: selected?.title as string,
  };

  const options = useSelector(optionsSelector);
  const drawing = useSelector(drawingSelector);
  const related = useSelector(relatedSelector);

  const {
    isLoading: isSearchLoading,
    isFetching: isSearchFetching,
    refetch: refetchSearch,
  } = useSearchQuery(searchArgs, { skip: !search });

  const {
    isLoading: isDrawingLoading,
    isFetching: isDrawingFetching,
    refetch: refetchDrawing,
  } = useGetDrawingQuery(drawingArgs, { skip: !selected });

  const {
    isLoading: isRelatedLoading,
    isFetching: isRelatedFetching,
    refetch: refetchRelated,
  } = useGetRelatedQuery(relatedArgs);

  useEffect(() => {
    if (search) refetchSearch();
  }, [search]);

  useEffect(() => {
    if (selected) refetchDrawing();
  }, [selected]);

  useEffect(() => {
    if (selected) refetchRelated();
  }, [selected]);

  useEffect(() => {
    dispatch(drawingSearchActions.init());

    window.addEventListener("keyup", onKeyUp);

    return () => {
      dispatch(drawingSearchActions.reset());

      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  function onKeyUp(e: KeyboardEvent) {
    const specialKeys: Record<string, () => void> = {
      ArrowLeft: () =>
        dispatch(drawingSearchActions.switchSelected({ to: "previous" })),
      ArrowRight: () =>
        dispatch(drawingSearchActions.switchSelected({ to: "next" })),
    };

    specialKeys[e.key]?.();
  }

  function onSearchChange(value: string) {
    dispatch(drawingSearchActions.setSearch(value.toUpperCase()));
  }

  function onSelectedChange(value: DrawingSearchResponse | null) {
    if (value && value?.id === selected?.id) return;
    dispatch(drawingSearchActions.setSelected(value));
  }

  return {
    isSearchLoading,
    isSearchFetching,
    search,
    selected,
    options,
    isDrawingLoading,
    isDrawingFetching,
    drawing,
    isRelatedLoading,
    isRelatedFetching,
    related,
    onSearchChange,
    onSelectedChange,
  };
};
