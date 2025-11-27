import useAuthStore from "@/features/auth/stores/authStore";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {

    const {isAuth} = useAuthStore();
    const routerLocation = useLocation();

    if (!isAuth) {
    return <Navigate to="/login" replace state={{ from: routerLocation.pathname }} />;
  }

    return <Outlet />;
}

export default ProtectedRoute;