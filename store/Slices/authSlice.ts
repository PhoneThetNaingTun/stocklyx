import { AuthSliceState, User } from "@/types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthSliceState = { token: null, user: null };

const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    removeToken: (state, action: PayloadAction<null>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    removeUser: (state, action: PayloadAction<null>) => {
      state.user = action.payload;
    },
  },
});

export const { setToken, removeToken, setUser, removeUser } = AuthSlice.actions;
export default AuthSlice.reducer;
