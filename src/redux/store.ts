import { configureStore } from "@reduxjs/toolkit";
import reducer from "./slice";

export const store = configureStore({
    reducer: {
        root: reducer
    }
})

export type ReduxStateType = ReturnType<typeof store.getState>