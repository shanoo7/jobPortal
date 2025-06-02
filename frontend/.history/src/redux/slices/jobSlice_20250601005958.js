import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createAxiosInstance } from "../../utils/axios";



// Update job (auth required + file upload)
export const updateJob = createAsyncThunk(
  'job/updateJob',
  async ({ id, updatedData }, { getState }) => {
    // console.log("Dispatching updateJob for ID:", id);
    // console.log("Updated data:", updatedData);
    const token = getState().auth.user?.token;
    const axios = createAxiosInstance(token);
    const res = await axios.patch(`/job/newupdate/${id}`, updatedData);
    console.log("Update response:", res.data);
    return res.data;
  }
);


// POST: Create new job (auth required)
export const postJob = createAsyncThunk(
  "job/post",
  async (formData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user?.token;
    const axios = createAxiosInstance(token);
    try {
      const res = await axios.post("/job/post", formData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);



//  GET: All jobs (with filters)
export const fetchAllJobs = createAsyncThunk(
  "job/fetchAll",
  async (filters = {}, thunkAPI) => {
    const axios = createAxiosInstance();
    const params = new URLSearchParams();

    if (filters.search) params.append("search", filters.search);
    if (filters.location && filters.location !== "all")
      params.append("location", filters.location);
    if (filters.company && filters.company !== "all")
      params.append("company", filters.company);

    try {
      const res = await axios.get(`/job/get?${params.toString()}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// GET: Admin jobs
export const fetchAdminJobs = createAsyncThunk(
  "job/fetchAdmin",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user?.token;
    const axios = createAxiosInstance(token);
    try {
      const res = await axios.get("/job/getadminjobs");
      return res.data.jobs;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// GET: Single job by ID
export const fetchJobById = createAsyncThunk(
  "job/fetchById",
  async (id, thunkAPI) => {
    const axios = createAxiosInstance();
    try {
      const res = await axios.get(`/job/get/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);


// PATCH: Update job status (open/closed)
export const updateJobStatus = createAsyncThunk(
  "job/updateStatus",
  async ({ jobId, status }, thunkAPI) => {
    const token = thunkAPI.getState().auth.user?.token;
    const axios = createAxiosInstance(token);
    try {
      const res = await axios.patch(`/job/update/${jobId}`, { isOpen: status });
      return res.data.job; // Make sure backend returns updated job
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);



// DELETE: Remove job (admin only)
export const deleteJob = createAsyncThunk(
  'job/deleteJob',
  async (jobId, { getState }) => {
    const token = getState().auth.user?.token;
    const axios = createAxiosInstance(token);
    const res = await axios.delete(`/job/delete/${jobId}`);
    return res.data;
  }
);


// Create the job slice
const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    singleJob: null,
    loading: false,
    error: null,
    filters: {
      search: "",
      location: "all",
      company: "all",
    },
  },
  reducers: {
    setSearchFilter(state, action) {
      state.filters.search = action.payload;
    },
    setLocationFilter(state, action) {
      state.filters.location = action.payload;
    },
    setCompanyFilter(state, action) {
      state.filters.company = action.payload;
    },
    clearFilters(state) {
      state.filters = { search: "", location: "all", company: "all" };
    },
  
  },
  extraReducers: (builder) => {
    builder

      // extraReducers for updateJob
      .addCase(updateJob.fulfilled, (state, action) => {
        state.loading = false;

        const updated = action.payload.job; // Extract from action.payload.job

        if (!updated || !updated._id) return;

        const adminIndex = state.allAdminJobs.findIndex((job) => job._id === updated._id);
        if (adminIndex !== -1) {
          state.allAdminJobs[adminIndex] = updated;
        }

        const allJobsIndex = state.allJobs.findIndex((job) => job._id === updated._id);
        if (allJobsIndex !== -1) {
          state.allJobs[allJobsIndex] = updated;
        }

        if (state.singleJob && state.singleJob._id === updated._id) {
          state.singleJob = updated;
        }
      })

      // extraReducers for postJob
      .addCase(postJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postJob.fulfilled, (state, action) => {
        state.loading = false;
        state.allAdminJobs.push(action.payload);
      })
      .addCase(postJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // extraReducers for fetchAllJobs, fetchAdminJobs, fetchJobById
      .addCase(fetchAllJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(action.payload)) {
          state.allJobs = action.payload;
        } else if (action.payload && Array.isArray(action.payload.jobs)) {
          state.allJobs = action.payload.jobs;
        } else {
          state.allJobs = [];
        }
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // extraReducers for fetchAdminJobs
      .addCase(fetchAdminJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.allAdminJobs = action.payload;
      })
      .addCase(fetchAdminJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // extraReducers for fetchJobById
      .addCase(fetchJobById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleJob = {

          ...action.payload.job,
          created_by: action.payload.job.created_by.toString()

        };
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false;
        // Ensure we store the error message string
        state.error = action.payload?.message || "Failed to load job details";
      })


      //deleteJob
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.allAdminJobs = state.allAdminJobs.filter(
          (job) => job._id !== action.payload.job._id
        );
      })


      // Handle updateJobStatus
      .addCase(updateJobStatus.fulfilled, (state, action) => {
        const updatedJob = action.payload;

        if (state.singleJob && state.singleJob._id === updatedJob._id) {
          state.singleJob = updatedJob;
        }
      });
  },
});

export const {
  setSearchFilter,
  setLocationFilter,
  setCompanyFilter,
  clearFilters,
  saveJob,
  unsaveJob,
} = jobSlice.actions;

export default jobSlice.reducer;
