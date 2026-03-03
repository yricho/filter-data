import { createBrowserRouter } from "react-router-dom";
import FilterPage, { regionLoader } from "./pages/FilterPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <FilterPage />,
    loader: regionLoader,
  },
]);
