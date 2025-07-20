import { Navigate, Outlet, useLocation } from "react-router";
import { useAccount } from "../../lib/hooks/useAccount";
import { useEffect } from "react";

export default function RequireAuth() {
    const { currentUser, loadingUserInfo, fetchCurrentUser } = useAccount();
    const location = useLocation();

    useEffect(() => {
        if (!currentUser) {
            fetchCurrentUser();
        }
    }, []);

    if (loadingUserInfo) return <div>Loading user...</div>;

    if (!currentUser) {
        return <Navigate to='/login' state={{ from: location }} replace />;
    }

    return <Outlet />;
}
