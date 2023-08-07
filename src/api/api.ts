import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const API_URL = "http://192.168.0.30/api/"; // Turėtų ateiti iš process.env variables

export const api = createApi({
  reducerPath: "api",
  keepUnusedDataFor: 0,
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders(headers, api) {
      const token = (api.getState() as RootState).auth.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);

      return headers;
    },
  }),
  endpoints: () => ({}),
});
