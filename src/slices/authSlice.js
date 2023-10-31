import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "none",
  isLoggedIn:false,
  token:null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem("token",action.payload.token)
      state.user = action.payload.user;
      state.isLoggedIn = true;
      state.token = action.payload.token;
    },
    logout: (state, action) => {
        localStorage.removeItem("token")
        state.user = "none";
        state.isLoggedIn = false;
        state.token = null;
    },
  },
});

export const { login,logout } = authSlice.actions;

export const authorization = (state) => state.auth;

export default authSlice.reducer;
