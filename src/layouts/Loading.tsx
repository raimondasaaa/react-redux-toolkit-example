import { CircularProgress, Grid } from "@mui/material";
import { motion } from "framer-motion";

const MotionGrid = motion(Grid);

export const LoadingLayout = () => {
  return (
    <MotionGrid
      container
      sx={{
        display: "grid",
        height: "100vh",
        width: "100vw",
        placeItems: "center",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, scale: 0 }}
    >
      <Grid item>
        <CircularProgress />
      </Grid>
    </MotionGrid>
  );
};
