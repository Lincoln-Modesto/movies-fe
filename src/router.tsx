import { createBrowserRouter } from "react-router-dom";
import List from "./pages/movies/list";
import Movie from "./pages/movies/movie";
import Fallback from "./pages/error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <List />,
    errorElement: <Fallback/>
  },
  {
    path: "/lista",
    element: <List />,
  },
  {
    path: "/home",
    element: <List />,
  },
  {
    path: "/novo-filme",
    element: <Movie />,
  },
  {
    path: "/filme/:id",
    element: <Movie />,
  },
]);

export default router;
