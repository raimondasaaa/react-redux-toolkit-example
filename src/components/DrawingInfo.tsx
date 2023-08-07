import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Paper,
} from "@mui/material";
import { DrawingResponse } from "../api/drawing";
import { AnimatePresence, motion } from "framer-motion";
import { DateRangeOutlined, EmailOutlined } from "@mui/icons-material";
import { formatAsWeekDayString } from "../utils/date";

export type DrawingInfoProps = {
  isLoading: boolean;
  drawing: DrawingResponse | undefined;
};

const MotionPaper = motion(Paper);

export const DrawingInfo = (props: DrawingInfoProps) => {
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
          <List>
            <ListSubheader sx={{ bgcolor: "transparent" }}>
              Paskutinis atnaujino
            </ListSubheader>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar>
                  <EmailOutlined sx={{ color: "white" }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="El. pašto adresas"
                secondary={props.drawing.updater.email}
                onClick={() =>
                  window.open(
                    `mailto:${props.drawing?.updater.email}`,
                    "_blank"
                  )
                }
              />
            </ListItemButton>
            <ListItem></ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <DateRangeOutlined sx={{ color: "white" }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Paskutinio redagavimo data"
                secondary={formatAsWeekDayString(props.drawing.pdf.updatedAt)}
              />
            </ListItem>
          </List>
        </MotionPaper>
      )}
      ;
    </AnimatePresence>
  );
};
