import { createSlice } from "@reduxjs/toolkit";

const initialState = { total: 0 ,refids:[]};
console.log(initialState)

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    addProductPrice: (state, action) => {
      state.total += Number(action.payload.total);
      state.refids.push({id:action.payload.refId});
      return state;
    },
    modifyProductPrice: (state, action) => {
      state.total -= Number(action.payload.total);
      state.refids = state.refids.filter(ref => ref.id != action.payload.refId);
      return state;
    },

    increaseProductPrice: (state, action) => {
      return state;
    },
  },
});

export const { addProductPrice, modifyProductPrice, increaseProductPrice } =
  productSlice.actions;

export const productState = (state) => state.product;

export default productSlice.reducer;
