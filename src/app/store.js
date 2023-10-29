import { configureStore } from "@reduxjs/toolkit";
import productSliceReducer from "../slices/productSlice";
import thunk from "redux-thunk";
import loginSliceReducer from "../slices/loginSlice";
import authSliceReducer from "../slices/authSlice";
import { productApi } from "../service/product";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { poApi } from "../service/po";


export const store = configureStore({
    reducer: {
        product:productSliceReducer,
        login:loginSliceReducer,
        auth:authSliceReducer,
        [productApi.reducerPath]: productApi.reducer,
        [poApi.reducerPath] : poApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productApi.middleware,poApi.middleware,thunk)
})

setupListeners(store.dispatch)