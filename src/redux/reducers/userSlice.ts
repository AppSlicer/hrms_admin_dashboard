import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {REDUX_STATE_NAME} from "../../enum/state.enum.ts";

const initialState = {
    name: null,
};

const userSlice = createSlice({
    name: REDUX_STATE_NAME.USER,
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<string>) => {
            // @ts-ignore
            state.name = action.payload;
        },
        clearUser: (state) => {
            state.name = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
