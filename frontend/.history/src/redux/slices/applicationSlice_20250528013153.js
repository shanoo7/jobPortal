

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createAxiosInstance } from "../../utils/axios";

const axiosInstance = createAxiosInstance();

export const applyForJob = createAsyncThunk(
  "application/applyForJob",
  async ({ jobId, userId }, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/application/apply/${jobId}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Something went wrong"
      );
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



export const fetchApplicantsByJobId = createAsyncThunk(
  "application/fetchApplicants",
  async (jobId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.user?.token;
      
      console.log('Token being used:', token); // Debug log
      
      if (!token) {
        console.error('No token found in state');
        return thunkAPI.rejectWithValue("Authentication required.");
      }
      
      const axios = createAxiosInstance(token);
      const res = await axios.get(`/application/${jobId}/applicants`);
      
      console.log('API response:', res.data); // Debug log
      
      return res.data.applications || []; // Ensure we always return an array
    } catch (err) {
      console.error('Error fetching applicants:', err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
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

      // Add this to extraReducers to update local state after status change
.addCase(updateApplicationStatus.fulfilled, (state, action) => {
  state.loading = false;
  state.success = "Status updated!";
  
  // Update specific application in state
  if (state.applicants) {
    const index = state.applicants.findIndex(
      app => app._id === action.payload._id
    );
    if (index !== -1) {
      state.applicants[index] = action.payload;
    }
  }
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

   
.addCase(fetchApplicantsByJobId.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchApplicantsByJobId.fulfilled, (state, action) => {
      state.loading = false;
      state.applicants = action.payload;
      console.log('Applicants set in state:', action.payload); // Debug log
    })
    .addCase(fetchApplicantsByJobId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.error('Error in fetchApplicants:', action.payload); // Debug log
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

