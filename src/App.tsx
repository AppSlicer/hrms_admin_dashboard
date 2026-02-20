import Router from "./router/Router.tsx";
import {Toaster} from "sonner";
import {useEffect} from "react";
import Cookies from "js-cookie";
import {TOKEN_NAME} from "@/enum/token.enum.ts";
import {useDispatch} from "react-redux";
import {login} from "@/redux/reducers/authSlice.ts";

export default function App () {

    const dispatch = useDispatch();

    useEffect(() => {
        const token = Cookies.get(TOKEN_NAME.HRM_FIRM);
        const userCookie = Cookies.get(TOKEN_NAME.USER_INFO);

        if (userCookie && token) {
            try {
                const user = JSON.parse(userCookie);
                dispatch(login({ token: token, user: user }));
            } catch (e) {
                console.error("Failed to parse user info", e);
            }
        }

        // Initialize Theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [dispatch]);

    return (
        <>
            <Router />
            <Toaster />
        </>
    )
}