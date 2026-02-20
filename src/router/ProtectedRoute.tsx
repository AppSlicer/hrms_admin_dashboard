import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type {RootState} from "../redux/stores/store.ts";
import {USER_ROLE_ENUM} from "@/enum/role.enum.ts";
import {toast} from "sonner";
import {useEffect} from "react";

export default function ProtectedRoute() {
    const { token, user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (token && user) {
            const isAdmin = user.role === USER_ROLE_ENUM.SUPER_ADMIN || user.role === USER_ROLE_ENUM.SUB_ADMIN;
            if (!isAdmin) {
                toast.error("Unauthorized: Dashboard is restricted to admins.");
            }
        }
    }, [token, user]);

    // If no token, redirect to sign-in page
    if (!token) {
        return <Navigate to="/sign-in" replace />;
    }

    // Role Check
    const isAdmin = user?.role === USER_ROLE_ENUM.SUPER_ADMIN || user?.role === USER_ROLE_ENUM.SUB_ADMIN;
    if (!isAdmin) {
        return <Navigate to="/sign-in" replace />;
    }

    // If logged in and is admin, render child routes
    return <Outlet />;
}
