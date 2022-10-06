import { createApi } from "@reduxjs/toolkit/query";
import { request, ClientError } from "graphql-request";

import {
  getCategories,
  getProducts,
  getCurrencies,
  getProductById,
  getProductsByCategory,
} from "../../utils/grapqlQueries";

const graphqlBaseQuery =
  ({ baseUrl }) =>
  async ({ body }) => {
    try {
      const result = await request(baseUrl, body);
      return { data: result };
    } catch (error) {
      if (error instanceof ClientError) {
        return { error: { status: error.response.status, data: error } };
      }
      return { error: { status: 500, data: error } };
    }
  };

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: graphqlBaseQuery({
    baseUrl: "https://demo-shop-graphql-server.herokuapp.com/",
  }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        body: getCategories,
      }),
      transformResponse: (response) => response.categories,
    }),
    getProducts: builder.query({
      query: () => ({
        body: getProducts,
      }),
      transformResponse: (response) => response.categories,
    }),
    getCurrencies: builder.query({
      query: () => ({
        body: getCurrencies,
      }),
      transformResponse: (response) => response.currencies,
    }),
    getProductById: builder.query({
      query: (id) => ({
        body: getProductById(id)
      }),
      transformResponse: (response) => response.product,
    }),
    getProductsByCategory: builder.query({
      query: (category) => ({
        body: getProductsByCategory(category),
      }),
      transformResponse: (response) => response.category,
    }),
  }),
});