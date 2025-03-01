import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Array<CarrierItem> = [];

const Carrierslice = createSlice({
  name: "rootSlice",
  initialState,
  reducers: {
    setCarrierInRedux: (_, action: PayloadAction<Array<CarrierItem>>) => {
      return action.payload;
    },
  },
});

export default Carrierslice.reducer;
export const { setCarrierInRedux } = Carrierslice.actions;
