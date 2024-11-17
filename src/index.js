import React from "react";
import ReactDOM from "react-dom/client";
import { Reset } from "styled-reset";
import { RecoilRoot } from "recoil";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "utils/style";
import router from "./utils/Router";
import { OpenProvider } from "components/global/ContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <OpenProvider>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <Reset />
          <RouterProvider router={router} />
        </ThemeProvider>
      </RecoilRoot>
    </OpenProvider>
  </React.StrictMode>
);
