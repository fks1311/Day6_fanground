import React from "react";
import ReactDOM from "react-dom/client";
import reset from "styled-reset";
import { RecoilRoot } from "recoil";
import { RouterProvider } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { theme } from "utils/style";
import router from "./utils/Router";
import { OpenProvider } from "components/global/ContextProvider";
import "utils/font/font.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

const GlobalStyle = createGlobalStyle`
${reset}
* {
  box-sizing:border-box;
  cursor:pointer;
}
body {
  font-family:중니좋체;
}
`;

root.render(
  <QueryClientProvider client={queryClient}>
    <OpenProvider>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <RouterProvider router={router} />
        </ThemeProvider>
      </RecoilRoot>
    </OpenProvider>
  </QueryClientProvider>
);
