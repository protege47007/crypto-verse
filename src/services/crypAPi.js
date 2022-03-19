import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

const options = (url) => ({
  method: "GET",
  url: `https://coinranking1.p.rapidapi.com${url}`,
  params: {
    timePeriod: "24h",
    tiers: "1",
    orderBy: "marketCap",
    orderDirection: "desc",
    limit: "50",
  },
  headers: {
    "x-rapidapi-host": process.env.REACT_APP_DOMAIN,
    "x-rapidapi-key": process.env.REACT_APP_API_KEY,
  },
});

export const getCoinsData = createAsyncThunk(
  "getData",
 async (thunkAPI) => {
     const response = await axios.request(options("/coins"))
     
     return response.data 
 }
);

const initialState = {
    data: {},
    loading: true
};

export const cryAPI = createSlice({
  name: "cryptosAPI",
  initialState,
  reducers: {},
  extraReducers:  {
      [getCoinsData.pending]: (state) => {
          state.loading = true
      },
      [getCoinsData.fulfilled]: (state, {payload}) => {
        state.loading = false
        state.data = payload
      },
      [getCoinsData.rejected]: (state) => {
          state.loading =false
          state.data = {message: "rejected"}
      }
    //   builder.addCase(getCoinsData.fulfilled, (state, action) => {
    //     console.log(action.payload);  
    //     state.value = action.payload
    //   })
  },
});

// useDispatch()


export const { getCoins } = cryAPI.actions;

export default cryAPI.reducer;
