//Router
import { Outlet, Navigate } from "react-router-dom";

//Context
import { useAuth } from "../../context/AuthContext";

const RootLayout = () => {
  const { user } = useAuth();

  if (user == null) return <Navigate to="/login" />;

  return <Outlet></Outlet>;
};

export default RootLayout;
