import React from "react";
import ReactDOM from "react-dom/client";
import reset, { Reset } from "styled-reset";
import { RecoilRoot } from "recoil";
import { RouterProvider } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { theme } from "utils/style";
import router from "./utils/Router";
import { OpenProvider } from "components/global/ContextProvider";
import { createGlobalState } from "react-use";

const root = ReactDOM.createRoot(document.getElementById("root"));
const GlobalStyle = createGlobalStyle`
${reset}
* {
  box-sizing:border-box;
}
`;

root.render(
  <React.StrictMode>
    <OpenProvider>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          {/* <Reset /> */}
          <GlobalStyle />
          <RouterProvider router={router} />
        </ThemeProvider>
      </RecoilRoot>
    </OpenProvider>
  </React.StrictMode>
);
