import "./index.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import "react-toastify/dist/ReactToastify.css";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { HistoryRouter as Router } from "redux-first-history/rr6";

import { pdfjs } from "react-pdf";

import { ToastContainer } from "react-toastify";

import { history, store } from "./store";

import { LayoutContainer } from "./layouts";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LayoutContainer />
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </ThemeProvider>
    </Router>
  </Provider>
);
