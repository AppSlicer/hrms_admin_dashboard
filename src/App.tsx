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
        const user = Cookies.get(TOKEN_NAME.USER_INFO);

        if ( user && token )
            dispatch(login({token: JSON.parse(token), user: JSON.parse(user)}));
        else if ( !user && !token )
            dispatch(login({token: undefined, user: undefined}));

    }, []);

    return (
        <>
            <Router />
            <Toaster />
        </>
    )
}