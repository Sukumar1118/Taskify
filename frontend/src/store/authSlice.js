import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";

const userDetails = localStorage.getItem("user");
let parsedUser = null;

try {
  parsedUser = userDetails ? JSON.parse(userDetails) : null;
} catch (error) {
  parsedUser = null;
}

const initialState = {
  user: parsedUser,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await API.post("/auth/login", credentials);
      if (!res.data.user || !res.data.token) {
        return rejectWithValue({ message: "Invalid response from server" });
      }
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Login failed" });
    }
  }
);

export const signup = createAsyncThunk(
  "auth/register",
  async (details, { rejectWithValue }) => {
    try {
      const res = await API.post("/auth/register", details);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Signup failed" }
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Signup failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
