import { Home } from "pages/Home";
import { Loading } from "pages/Loading";
import { Album } from "pages/Album";
import { Album_Track } from "pages/Album_Track";
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
    element: <Album />,
  },
  {
    path: "/album/:id",
    element: <Album_Track />,
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
