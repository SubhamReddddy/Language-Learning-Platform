import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { user: User | null } = {
  user: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    adduser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});
export const { adduser } = userSlice.actions;
export default userSlice.reducer;
