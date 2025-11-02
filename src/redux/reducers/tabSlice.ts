import {createSlice} from "@reduxjs/toolkit";
import {REDUX_STATE_NAME} from "../../enum/state.enum.ts";

const initialState = {
    tab: "Overview"
}

const tabSlice = createSlice({
    name: REDUX_STATE_NAME.TAB,
    initialState,
    reducers: {
        setTabOnState: (state, action) => {
            state.tab = action.payload.tab;
        },
    },
});

export const { setTabOnState } = tabSlice.actions;
export default tabSlice.reducer;