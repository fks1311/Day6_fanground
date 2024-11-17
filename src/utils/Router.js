import { Home } from "pages/Home";
import { Loading } from "pages/Loading";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Loading />,
  },
  {
    path: "/day6",
    element: <Home />,
  },
]);

export default router;
