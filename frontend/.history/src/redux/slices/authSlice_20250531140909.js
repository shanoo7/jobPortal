import { createSlice, createAsyncThunk,isRejected } from "@reduxjs/toolkit";
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

// Like job thunk
export const likeJob = createAsyncThunk(
  "auth/likeJob",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/v1/user/jobs/like/${jobId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Unlike job thunk
export const unlikeJob = createAsyncThunk(
  "auth/unlikeJob",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/v1/user/jobs/unlike/${jobId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get liked jobs thunk
export const getLikedJobs = createAsyncThunk(
  "auth/getLikedJobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/user/jobs/liked");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const isRejectedAction = (...actions) => (action) => {
  return actions.some((a) => a.rejected.match(action)) && isRejected(action);
};



const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    likedJobs: [],
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
        state.user.likedJobs = action.payload.likedJobs;
        toast.success("Job saved successfully!");
      })
      .addCase(unlikeJob.fulfilled, (state, action) => {
        state.user.likedJobs = action.payload.likedJobs;
        toast.success("Job removed from saved!");
      })
      .addCase(getLikedJobs.fulfilled, (state, action) => {
        state.likedJobs = action.payload.jobs;
      })
      .addMatcher(
        isRejectedAction(likeJob, unlikeJob, getLikedJobs),
        (state, action) => {
          toast.error(action.payload?.message || "An error occurred");
        }
      );
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;


