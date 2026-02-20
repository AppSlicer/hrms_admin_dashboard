import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../reducers/userSlice.ts";
import authSlice from "../reducers/authSlice.ts";
import tabSlice from "@/redux/reducers/tabSlice.ts";
import searchSlice from "../reducers/searchSlice.ts";
import themeSlice from "../reducers/themeSlice.ts";

export const store = configureStore({
    reducer: {
        user: userSlice,
        auth: authSlice,
        tab: tabSlice,
        search: searchSlice,
        theme: themeSlice,
    },
});

// Types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
