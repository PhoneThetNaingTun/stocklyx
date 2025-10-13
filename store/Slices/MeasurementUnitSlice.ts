import { MeasurementUnit } from "@/types/measurement-unit";
import { createSlice } from "@reduxjs/toolkit";

export interface MeasurementUnitState {
  measurementUnits: MeasurementUnit[];
}

const initialState: MeasurementUnitState = {
  measurementUnits: [],
};

const MeasurementUnitSlice = createSlice({
  name: "MeasurementUnit",
  initialState,
  reducers: {
    setMeasurementUnits: (state, action) => {
      state.measurementUnits = action.payload;
    },
  },
});

export const { setMeasurementUnits } = MeasurementUnitSlice.actions;
export default MeasurementUnitSlice.reducer;
