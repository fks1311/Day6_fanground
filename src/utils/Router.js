import { Loading } from "pages/Loading";
import { Home } from "pages/Home";
import { Profile } from "pages/Profile";
import { MV } from "pages/MV";
import { Album } from "pages/Album";
import { Album_Track } from "pages/Album_Track";
import { Youtube } from "pages/Youtube";
import { Playlists_Track } from "pages/Playlists_Track";
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
    element: <Profile />,
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
    element: <Youtube />,
  },
  {
    path: "/watch/:id",
    element: <Playlists_Track />,
  },
]);

export default router;
