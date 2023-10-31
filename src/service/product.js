import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "ProductApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9090/",
  }),
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: () => "product/",
    }),
    getAllRfp: builder.query({
      query: () => "rfp/",
    }),
    getVendorByRfpId: builder.query({
      query: (id) => `rfp/${id}/`,
    }),

    getAllVendor: builder.query({
      query: () => "vendor/"
    }),
    getVendorByRfp: builder.query({
      query: (i) => `vendor/rfp/${i}`,
    }),

    getProductByVendor: builder.query({
      query: (i) => `reftable/vendor/${i}`,
    }),

    getProductWithVendors: builder.query({
      query: (i) => `reftable/v/${i}`,
    }),

    downloadCs: builder.query({
      query:() => `csv/`
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useGetAllRfpQuery,
  useGetAllVendorQuery,
  useGetVendorByRfpQuery,
  useGetVendorByRfpIdQuery,
  useGetProductByVendorQuery,
  useGetProductWithVendorsQuery,
  useDownloadCsQuery,
} = productApi;
