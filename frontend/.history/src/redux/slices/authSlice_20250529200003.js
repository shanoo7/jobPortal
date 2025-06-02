

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createAxiosInstance } from "../../utils/axios";



// REGISTER
export const registerUser = createAsyncThunk("auth/register", async (formData, thunkAPI) => {
  const axios = createAxiosInstance();
  try {
    const res = await axios.post("/user/register", formData);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

// LOGIN
export const loginUser = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
  const axios = createAxiosInstance();
  try {
    const res = await axios.post("/user/login", credentials);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

// LOGOUT
export const logoutUser = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  const token = thunkAPI.getState().auth.user?.token;
  const axios = createAxiosInstance(token);
  try {
    await axios.get("/user/logout");
    return null;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

// UPDATE PROFILE
export const updateUserProfile = createAsyncThunk("auth/updateProfile", async (formData, thunkAPI) => {
  const token = thunkAPI.getState().auth.user?.token;
  const axios = createAxiosInstance(token);
  try {
    const res = await axios.post("/user/profile/update", formData);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});


export const likeJob = createAsyncThunk(
  'auth/likeJob',
  async (jobId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();

      // Add console log here to check full auth state
      console.log("Full auth state:", state.auth);

      // const token = state.auth.user?.token;
      const token = state.auth.user?.token;

      console.log("Token in likeJob thunk:", token);

      if (!token) {
        return thunkAPI.rejectWithValue("No token found");
      }

      const axiosPrivate = createAxiosInstance(token);

      const response = await axiosPrivate.post(`/user/jobs/like/${jobId}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);


export const unlikeJob = createAsyncThunk("auth/unlikeJob", async (jobId, thunkAPI) => {
  const token = thunkAPI.getState().auth.user?.token;
  const axios = createAxiosInstance(token);
  try {
    await axios.delete(`/user/jobs/unlike/${jobId}`);
    return jobId;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});


// GET SAVED JOBS
export const fetchSavedJobs = createAsyncThunk("auth/fetchSavedJobs", async (_, thunkAPI) => {
  const token = thunkAPI.getState().auth.user?.token;
  const axios = createAxiosInstance(token);
  try {
    const res = await axios.get("/user/jobs/saved");
    return res.data.savedJobs;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    likedJobs: [],
    savedJobs: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.likedJobs = [];
        state.savedJobs = [];
      })

      // UPDATE PROFILE
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(likeJob.fulfilled, (state, action) => {
  const job = action.payload;
  if (!state.likedJobs.find(j => j._id === job._id)) {
    state.likedJobs.push(job);
  }
})
.addCase(unlikeJob.fulfilled, (state, action) => {
  const jobId = action.payload;
  state.likedJobs = state.likedJobs.filter(j => j._id !== jobId);
})


      // FETCH SAVED JOBS
      .addCase(fetchSavedJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSavedJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.savedJobs = action.payload;
      })
      .addCase(fetchSavedJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;


