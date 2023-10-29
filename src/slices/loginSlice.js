import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "none",
};

export const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      console.log(action.payload)
      state.user = action.payload;
    },
    deleteUser: (state, action) => {
      state.user = "none";
    },
  },
});

export const { updateUser, deleteUser } = loginSlice.actions;

export const userLoggedin = (state) => state.login;

export default loginSlice.reducer;
