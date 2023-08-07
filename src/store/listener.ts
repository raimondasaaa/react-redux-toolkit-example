import { createListenerMiddleware } from "@reduxjs/toolkit";

import { initListener } from "./listeners/init";
import { authListener } from "./listeners/auth";
import { drawingSearchListener } from "./listeners/drawing-search";

export const listener = createListenerMiddleware();

initListener(listener);
authListener(listener);
drawingSearchListener(listener);
