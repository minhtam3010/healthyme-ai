import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../interface/user";

const userSlice = createSlice({
  name: "user",
  initialState: { data: {} as User },
  reducers: {
    saveUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      if (state.data) {
        state.data = { ...state.data, ...action.payload };
      }
    },
  },
});

export const usersSlice = createSlice({
  name: "users",
  initialState: { data: [] as User[] },
  reducers: {
    saveUser: (state, action: PayloadAction<User>) => {
      state.data.push(action.payload);
    },
    deleteUser: (state, action: PayloadAction<User>) => {
      const user = action?.payload;
      state.data = state.data.filter((q) => q?.id !== user?.id);
    },
  },
});

export const { saveUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
