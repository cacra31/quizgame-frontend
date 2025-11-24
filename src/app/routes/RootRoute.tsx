import useAuthStore from "@/features/auth/stores/authStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RootRoute = () => {

    const navigate = useNavigate();
    const authStore = useAuthStore();

    useEffect(() => {
        if (authStore.isAuth) {
            navigate("/home", { replace: true });
        } else {
            navigate("/login", { replace: true });
        }
    }, [navigate]);

    return null;
}

export default RootRoute;