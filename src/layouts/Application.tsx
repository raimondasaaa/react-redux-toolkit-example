import { Routes, Route } from "react-router-dom";

import { DrawingSearchPage } from "../pages/DrawingSearchPage";
import { AppBar, Box, Button, Chip, Container, Toolbar } from "@mui/material";

import { motion } from "framer-motion";
import { LogoutOutlined } from "@mui/icons-material";
import { useApplication } from "../hooks/useApplication";
import { CompanyLogo } from "../components/CompanyLogo";
import { useUser } from "../hooks/useUser";

const MotionBox = motion(Box);

export const ApplicationLayout = () => {
  const { user } = useUser();
  const { logout } = useApplication();

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0 }}
    >
      <AppBar position="static">
        <Toolbar>
          <CompanyLogo />
          <Box sx={{ flexGrow: 1 }} />
          <Chip
            label={`Labas, ${user?.profile.firstname} ${user?.profile.lastname}!`}
            sx={{ mr: 2 }}
          />
          <Button color="inherit" onClick={logout}>
            <LogoutOutlined sx={{ marginRight: "0.5rem" }} />
            Atsijungti
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="main">
        <Container maxWidth={false}>
          <Routes>
            <Route path="/drawing-search" element={<DrawingSearchPage />} />
          </Routes>
        </Container>
      </Box>
    </MotionBox>
  );
};
