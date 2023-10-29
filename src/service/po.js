import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const poApi = createApi({
    reducerPath:"PoApi",
    baseQuery: fetchBaseQuery({
        baseUrl:"http://localhost:9090/"
    }),
    tagTypes:["po"],
    endpoints:(builder) => ({
        addPo: builder.mutation({
            query:(po)=>({
                url:'po/',
                method:'POST',
                body:po,
            }),
        }),
    })
})

export const {
    useAddPoMutation,
} = poApi