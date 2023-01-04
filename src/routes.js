import { getItem } from "./utils/storage";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home/index";
import Cadastro from "./Pages/Cadastro";

function ProtectedRoutes({ redirectTo }) {
  const isAuthenticated = getItem("token");

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
}
function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/cadastre-se" element={<Cadastro />} />
      <Route element={<ProtectedRoutes redirectTo="/" />}>
        <Route path="/home" element={<Home />} />
      </Route>

      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default MainRoutes;
