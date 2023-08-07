import { Grid } from "@mui/material";

import { DrawingSearch } from "../components/DrawingSearch";
import { Drawing } from "../components/Drawing";
import { DrawingInfo } from "../components/DrawingInfo";
import { useDrawingSearch } from "../hooks/useDrawingSearch";
import { RelatedDrawings } from "../components/RelatedDrawings";

export const DrawingSearchPage = () => {
  const {
    isSearchLoading,
    isSearchFetching,
    search,
    selected,
    isDrawingLoading,
    drawing,
    options,
    related,
    onSearchChange,
    onSelectedChange,
  } = useDrawingSearch();

  return (
    <Grid container p={2} spacing={2}>
      <Grid item sm={12} md={12} xl={3}>
        <Grid container spacing={2}>
          <Grid item sm={12} md={12} xl={12}>
            <DrawingSearch
              isLoading={isSearchLoading || isSearchFetching}
              selected={selected}
              search={search}
              options={options}
              onSearchChange={onSearchChange}
              onSelectionChange={onSelectedChange}
            />
          </Grid>
          <Grid item sm={12} md={12} xl={12}>
            <RelatedDrawings
              selected={selected}
              drawing={drawing}
              related={related}
              onSelectionChange={onSelectedChange}
            />
          </Grid>
          <Grid item sm={12} md={12} xl={12}>
            <DrawingInfo isLoading={isDrawingLoading} drawing={drawing} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={12} md={12} xl={9}>
        <Drawing isLoading={isDrawingLoading} drawing={drawing} />
      </Grid>
    </Grid>
  );
};
