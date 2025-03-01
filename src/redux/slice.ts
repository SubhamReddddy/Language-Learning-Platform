import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: reduxInitialType = {
  isLoading: false,
  data: [],
  result: [],
};

const slice = createSlice({
  name: "rootSlice",
  initialState,
  reducers: {
    loading: (state) => {
      state.isLoading = true;
    },
    setData: (state, action: PayloadAction<responseType[]>) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    setResultInRedux: (state, action: PayloadAction<Array<string>>) => {
      state.result = action.payload;
    },
  },
});

export default slice.reducer;
export const { loading, setData, setResultInRedux } = slice.actions;
