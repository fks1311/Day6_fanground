import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import { Reset } from "styled-reset";
import { RecoilRoot } from "recoil";
import { RouterProvider } from "react-router-dom";
import router from "./utils/Router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <Reset />
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);
