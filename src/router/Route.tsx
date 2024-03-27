import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import DetailPage from "../pages/DetailPage";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      { path: "/", element: <Navigate to={"/login"} /> },
      { path: "/home", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/product/:productId", element: <DetailPage /> },
    ],
  },
]);

export default function Route() {
  return <RouterProvider router={routers} />;
}
