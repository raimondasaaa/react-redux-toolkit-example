import {
  Autocomplete,
  Avatar,
  Box,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Paper,
  TextField,
} from "@mui/material";
import { DrawingSearchResponse } from "../api/drawing";
import { PictureAsPdfOutlined } from "@mui/icons-material";

export type DrawingSearchProps = {
  isLoading: boolean;
  selected: DrawingSearchResponse | null;
  search: string;

  options: DrawingSearchResponse[];

  onSearchChange: (value: string) => void;
  onSelectionChange: (value: DrawingSearchResponse | null) => void;
};

export const DrawingSearch = (props: DrawingSearchProps) => {
  return (
    <Paper sx={{ padding: "1rem" }} elevation={4}>
      <List>
        <ListSubheader sx={{ bgcolor: "transparent" }}>
          Brėžinių paieška
        </ListSubheader>
      </List>
      <Autocomplete
        blurOnSelect
        loading={props.isLoading}
        value={props.selected}
        options={props.options}
        onChange={(_, value) => props.onSelectionChange(value)}
        getOptionLabel={(option) => `${option.title} (${option.revision})`}
        renderOption={(props, option) => {
          const bgcolor = option.title.includes("SB") ? "red" : "white";
          const color = option.title.includes("SB") ? "white" : "black";

          return (
            <ListItem
              {...props}
              secondaryAction={
                <Box>
                  {option.isPainted && (
                    <Chip
                      label="Dažoma"
                      sx={{ bgcolor: "red", color: "white" }}
                    />
                  )}
                  {option.isPrimaPower && (
                    <Chip
                      label="PrimaPower"
                      sx={{ bgcolor: "red", color: "white" }}
                    />
                  )}
                </Box>
              }
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor }}>
                  <PictureAsPdfOutlined sx={{ color }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={option.title}
                secondary={`Revizija: ${option.revision}`}
              />
            </ListItem>
          );
        }}
        noOptionsText={
          <Box key="no-options" sx={{ padding: "1rem" }}>
            Nėra paieškos rezultatų
          </Box>
        }
        loadingText={
          <Box key="loading" sx={{ padding: "1rem" }}>
            Kraunasi...
          </Box>
        }
        isOptionEqualToValue={(option, value) => option?.id === value?.id}
        autoHighlight
        autoSelect
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Įveskite brėžinio kodą"
            label="Brėžinio kodas"
            value={props.search}
            onChange={(e) => props.onSearchChange(e.target.value)}
          />
        )}
      />
    </Paper>
  );
};
