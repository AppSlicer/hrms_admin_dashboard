import type {AuthState} from "../../type/state/auth.type.ts";
import {createSlice} from "@reduxjs/toolkit";
import {REDUX_STATE_NAME} from "../../enum/state.enum.ts";
import Cookies from "js-cookie";
import {TOKEN_NAME} from "../../enum/token.enum.ts";

const token = Cookies.get(TOKEN_NAME.HRM_FIRM) || null;
const userCookie = Cookies.get(TOKEN_NAME.USER_INFO);
const user = userCookie ? JSON.parse(userCookie) : null;

const initialState: AuthState = {
    user,
    token,
}

const authSlice = createSlice({
    name: REDUX_STATE_NAME.AUTH,
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
            Cookies.set(TOKEN_NAME.USER_INFO, JSON.stringify(state.user));
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            Cookies.remove(TOKEN_NAME.HRM_FIRM);
            Cookies.remove(TOKEN_NAME.USER_INFO);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        },
    },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;