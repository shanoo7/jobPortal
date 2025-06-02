

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createAxiosInstance } from "../../utils/axios";

// 1. Apply for a job (protected)
// export const applyForJob = createAsyncThunk(
//   "application/apply",
//   async (jobId, thunkAPI) => {
//     const token = thunkAPI.getState().auth.user?.token;
//     if (!token) {
//       return thunkAPI.rejectWithValue("Authentication required.");
//     }
//     const axios = createAxiosInstance(token);
//     try {
//       const res = await axios.get(`/application/apply/${jobId}`);
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// export const applyForJob = createAsyncThunk(
//   "application/apply",
//   async ({ jobId }, thunkAPI) => {
//     const token = thunkAPI.getState().auth.user?.token;
//     if (!token) {
//       return thunkAPI.rejectWithValue("Authentication required.");
//     }

//     const axios = createAxiosInstance(token);
//     try {
//       const res = await axios.get(`/application/apply/${jobId}`);
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// redux/slices/applicationSlice.js
// export const applyForJob = createAsyncThunk(
//   "application/apply",
//   async ({ jobId }, thunkAPI) => {
//     const token = thunkAPI.getState().auth.user?.token;
//     if (!token) {
//       console.log("No token found");
//       return thunkAPI.rejectWithValue("Authentication required.");
//     }

//     const axios = createAxiosInstance(token);
//     console.log("Sending GET request to /application/apply/" + jobId);
//     try {
//       const res = await axios.get(`/application/apply/${jobId}`);
//       console.log("Apply API response:", res.data);
//       return res.data;
//     } catch (err) {
//       console.error("Apply API error:", err.response?.data || err.message);
//       return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// export const applyForJob = createAsyncThunk("application/applyJob", async (jobId, thunkAPI) => {
//   try {
//     const res = await axiosInstance.post(`/api/v1/application/apply/${jobId}`);
//     return res.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.response.data.message || "Error applying for job");
//   }
// });

export const applyForJob = createAsyncThunk(
  "application/applyForJob",
  async ({ jobId }, { getState, rejectWithValue }) => {
    try {
      // 🔑 Get token from auth slice or localStorage
      const token = getState().auth?.user?.token || localStorage.getItem("token");

      if (!token) {
        return rejectWithValue("Authentication required.");
      }

      const axiosInstance = createAxiosInstance(token);

      const res = await axiosInstance.post("/application/apply", {
        jobId,
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Failed to apply.");
    }
  }
);



// 2. Get all applied jobs for the logged-in user (protected)
export const fetchAppliedJobs = createAsyncThunk(
  "application/fetchApplied",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user?.token;
    if (!token) {
      return thunkAPI.rejectWithValue("Authentication required.");
    }
    const axios = createAxiosInstance(token);
    try {
      const res = await axios.get(`/application/get`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 3. Get applicants for a specific job (recruiter/admin, protected)
export const fetchApplicantsByJobId = createAsyncThunk(
  "application/fetchApplicants",
  async (jobId, thunkAPI) => {
    const token = thunkAPI.getState().auth.user?.token;
    if (!token) {
      return thunkAPI.rejectWithValue("Authentication required.");
    }
    const axios = createAxiosInstance(token);
    try {
      const res = await axios.get(`/application/${jobId}/applicants`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 4. Update application status (protected)
export const updateApplicationStatus = createAsyncThunk(
  "application/updateStatus",
  async ({ appId, status }, thunkAPI) => {
    const token = thunkAPI.getState().auth.user?.token;
    if (!token) {
      return thunkAPI.rejectWithValue("Authentication required.");
    }
    const axios = createAxiosInstance(token);
    try {
      const res = await axios.post(`/application/status/${appId}/update`, { status });
      return res.data; // Assuming the updated application object is returned
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    applicants: null,
    appliedJobs: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearApplicationError: (state) => {
      state.error = null;
    },
    clearApplicationSuccess: (state) => {
      state.success = null;
    },
    clearApplicationData: (state) => {
      state.appliedJobs = [];
      state.applicants = null;
      state.error = null;
      state.success = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Apply Job
      .addCase(applyForJob.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(applyForJob.fulfilled, (state) => {
        state.loading = false;
        state.success = "Job applied successfully!";
      })
      .addCase(applyForJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Applied Jobs
      .addCase(fetchAppliedJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppliedJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.appliedJobs = action.payload;
      })
      .addCase(fetchAppliedJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Applicants by Job ID
      .addCase(fetchApplicantsByJobId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplicantsByJobId.fulfilled, (state, action) => {
        state.loading = false;
        state.applicants = action.payload;
      })
      .addCase(fetchApplicantsByJobId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Application Status
      .addCase(updateApplicationStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Application status updated!";
        const updatedApp = action.payload;
        if (state.applicants) {
          const index = state.applicants.findIndex(app => app._id === updatedApp._id);
          if (index !== -1) {
            state.applicants[index] = updatedApp;
          }
        }
      })
      .addCase(updateApplicationStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearApplicationError,
  clearApplicationSuccess,
  clearApplicationData,
} = applicationSlice.actions;

export default applicationSlice.reducer;

