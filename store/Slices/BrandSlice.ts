import { Brand } from "@/types/brand";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BrandState {
  brands: Brand[];
}

const initialState: BrandState = {
  brands: [],
};

const BrandSlice = createSlice({
  name: "BrandSlice",
  initialState,
  reducers: {
    setBrands: (state, action: PayloadAction<Brand[]>) => {
      state.brands = action.payload;
    },
  },
});

export const { setBrands } = BrandSlice.actions;
export default BrandSlice.reducer;
