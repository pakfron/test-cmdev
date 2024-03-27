import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import DetailPage from "../pages/DetailPage";
import Login from "../feature/Login";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      { path: "/", element: <Navigate to={"/login"} /> },
      { path: "/home", element: <HomePage /> },
      {
        path: "/login",
        element: (
          <Login>
            <LoginPage />
          </Login>
        ),
      },
      { path: "/product/:productId", element: <DetailPage /> },
      { path: "*", element: <Navigate to={"/login"} /> },
    ],
  },
]);

export default function Route() {
  return <RouterProvider router={routers} />;
}
