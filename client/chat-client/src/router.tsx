import { createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Outlet } from "react-router-dom";

//Components
import AuthLayout from "./pages/layouts/AuthLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RootLayout from "./pages/layouts/RootLayout";
import Home from "./pages/Home";
import Channel from "./pages/Channel";

export const router = createBrowserRouter([
  {
    element: <ContextWrapper />,
    children: [
      {
        path: "/",
        element: <RootLayout />,
        children: [
          { index: true, element: <Home /> },
          {
            path: "/channel",
            children: [{ path: "new", element: <Channel /> }],
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          { path: "login", element: <Login /> },
          { path: "signup", element: <Signup /> },
        ],
      },
    ],
  },
]);

function ContextWrapper() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
