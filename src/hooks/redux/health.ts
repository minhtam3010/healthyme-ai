import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { HealthPlanResponse } from "../../interface/health";

const healthSlice = createSlice({
  name: "health",
  initialState: { data: {} as HealthPlanResponse },
  reducers: {
    saveHealth: (state, action: PayloadAction<HealthPlanResponse>) => {
      state.data = action.payload;
    },
  },
});

export const { saveHealth } = healthSlice.actions;
export default healthSlice.reducer;
