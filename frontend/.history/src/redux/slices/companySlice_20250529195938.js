import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createAxiosInstance } from "../../utils/axios";

// Register a new company (usually requires auth)
export const registerCompany = createAsyncThunk(
  "company/register",
  async (formData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user?.token;
    const axios = createAxiosInstance(token);
    try {
      const res = await axios.post("/company/register", formData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Get all companies (public route, no token needed)
export const fetchAllCompanies = createAsyncThunk(
  "company/fetchAll",
  async (_, thunkAPI) => {
    const axios = createAxiosInstance();
    try {
      const res = await axios.get("/company/get");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Get single company by ID (public route)
export const fetchCompanyById = createAsyncThunk(
  "company/fetchById",
  async (id, thunkAPI) => {
    const axios = createAxiosInstance();
    try {
      const res = await axios.get(`/company/get/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update company (auth required + file upload)
export const updateCompany = createAsyncThunk(
  "company/update",
  async ({ id, formData }, thunkAPI) => {
    const token = thunkAPI.getState().auth.user?.token;
    const axios = createAxiosInstance(token);
    try {
      const res = await axios.put(`/company/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const companySlice = createSlice({
  name: "company",
  initialState: {
    companies: [],
    singleCompany: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Register Company
      .addCase(registerCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.singleCompany = action.payload;
      })
      .addCase(registerCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Companies
      .addCase(fetchAllCompanies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload;
      })
      .addCase(fetchAllCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Single Company by ID
      .addCase(fetchCompanyById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCompanyById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleCompany = action.payload;
      })
      .addCase(fetchCompanyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Company
      .addCase(updateCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.singleCompany = action.payload;
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default companySlice.reducer;
