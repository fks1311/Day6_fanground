import { Home } from "pages/Home";
import { Loading } from "pages/Loading";
import { MV } from "pages/MV";
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
  {
    path: "/profile",
    element: <MV />,
  },
  {
    path: "/mv",
    element: <MV />,
  },
  {
    path: "/album",
    element: <MV />,
  },
  {
    path: "/youtube",
    element: <MV />,
  },
  {
    path: "/search",
    element: <MV />,
  },
]);

export default router;
