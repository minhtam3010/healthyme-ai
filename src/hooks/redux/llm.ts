import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const llmSlice = createSlice({
  name: "llm",
  initialState: false,
  reducers: {
    setLLMProcess: (_state, payload: PayloadAction<boolean>) => {
      return payload.payload;
    },
  },
});

export const { setLLMProcess } = llmSlice.actions;

export default llmSlice.reducer;
