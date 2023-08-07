import {
  Autocomplete,
  Avatar,
  Badge,
  Box,
  Chip,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  TextField,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { DrawingResponse, DrawingSearchResponse } from "../api/drawing";
import { PictureAsPdfOutlined } from "@mui/icons-material";

const MotionPaper = motion(Paper);

export type RelatedDrawingsProps = {
  selected: DrawingSearchResponse | null;
  drawing: DrawingResponse | undefined;
  related: DrawingSearchResponse[];

  onSelectionChange: (value: DrawingSearchResponse | null) => void;
};

export const RelatedDrawings = (props: RelatedDrawingsProps) => {
  return (
    <AnimatePresence mode="wait">
      {props.drawing?.id && (
        <MotionPaper
          key={props.drawing?.id}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.2,
            },
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.2,
            },
          }}
          sx={{ p: 2 }}
          elevation={4}
        >
          <Autocomplete
            value={props.selected ?? undefined}
            options={props.related}
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
            disableClearable
            renderInput={(params) => (
              <Badge
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                badgeContent={props.related.length}
                color="primary"
                sx={{ width: "100%" }}
              >
                <TextField
                  {...params}
                  fullWidth
                  label="Susiję brėžiniai"
                  value={props.selected?.title}
                />
              </Badge>
            )}
          />
        </MotionPaper>
      )}
    </AnimatePresence>
  );
};
