import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCountries = createAsyncThunk("countries/fetchCountries", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message || "Something went wrong!");
  }
});

const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching countries.";
      });
  },
});

export default countriesSlice.reducer;

