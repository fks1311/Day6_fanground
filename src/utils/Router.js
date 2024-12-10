import { Loading } from "pages/Loading";
import { Home } from "pages/Home";
import { Profile } from "pages/Profile";
import { MV } from "pages/MV";
import { Album } from "pages/Album";
import { Playlist_Track } from "pages/Playlist_Track";
import { Youtube } from "pages/Youtube";
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
    element: <Playlist_Track />,
  },
  {
    path: "/youtube",
    element: <Youtube />,
  },
  {
    path: "/search",
    element: <MV />,
  },
]);

export default router;
