import { Box, CircularProgress, Paper } from "@mui/material";
import { Document, Page } from "react-pdf";

import { motion } from "framer-motion";

import { DrawingResponse } from "../api/drawing";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export type DrawingProps = {
  isLoading: boolean;
  drawing: DrawingResponse | undefined;
};

const MotionPaper = motion(Paper);

export const Drawing = (props: DrawingProps) => {
  const [width, setWidth] = useState<number>(280);
  const [height, setHeight] = useState<number>(280);

  const [visible, setVisible] = useState<boolean>(false);

  const onRenderSuccess = () => {
    const drawingCanvasElements = document.getElementsByClassName(
      "react-pdf__Page__canvas"
    );

    if (drawingCanvasElements.length === 1) {
      const drawingCanvasElement = drawingCanvasElements[0];
      setWidth(drawingCanvasElement.clientWidth);
      setHeight(drawingCanvasElement.clientHeight);
    }

    setVisible(true);
  };

  useEffect(() => {
    setVisible(false);
  }, [props.drawing]);

  return (
    <AnimatePresence mode="wait">
      {props.drawing?.id && (
        <MotionPaper
          initial={{
            opacity: 0,
          }}
          animate={
            visible
              ? {
                  opacity: 1,
                  transition: {
                    duration: 0.2,
                  },
                }
              : { opacity: 0 }
          }
          exit={{
            opacity: 0,
            transition: {
              duration: 0.2,
            },
          }}
          sx={{ p: 2 }}
          elevation={4}
        >
          <Document
            file={props.drawing?.pdf.data}
            loading={
              <Box
                sx={{
                  width,
                  height,
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <CircularProgress color="primary" />
              </Box>
            }
          >
            <Page
              pageNumber={1}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              onRenderSuccess={onRenderSuccess}
              scale={2}
            />
          </Document>
        </MotionPaper>
      )}
    </AnimatePresence>
  );
};
