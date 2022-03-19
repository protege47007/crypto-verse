import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const cryptoApiHeaders = {
  "x-rapidapi-host": process.env.REACT_APP_DOMAIN,
  "x-rapidapi-key": process.env.REACT_APP_API_KEY,
};

const baseUrl = process.env.REACT_APP_API_URL;

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery(baseUrl),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => createRequest("/coins"),
    }),
  }),
});
export const { useGetCryptosQuery } = cryptoApi;
