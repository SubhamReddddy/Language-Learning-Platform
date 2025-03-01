import { configureStore } from "@reduxjs/toolkit";
import reducer from "./slice";
import userReducer from "./userSlice";
import carrierReducer from "./carrierSlice";
export const store = configureStore({
  reducer: {
    root: reducer,
    user: userReducer,
    carrier: carrierReducer,
  },
});

export type ReduxStateType = ReturnType<typeof store.getState>;
