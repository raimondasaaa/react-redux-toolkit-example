import { Route, Routes } from "react-router-dom";

import { LoginPage } from "../pages/LoginPage";
import { motion } from "framer-motion";
import { Box } from "@mui/material";

const MotionBox = motion(Box);

export const LoginLayout = () => {
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0 }}
    >
      <Routes>
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </MotionBox>
  );
};
