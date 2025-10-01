import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  filters: {},
};

export const fetchTasks = createAsyncThunk(
  "tasks/fetch",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { filters } = getState().tasks;
      const q = new URLSearchParams(filters).toString();
      const res = await API.get("/tasks?" + q);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Fetch failed" });
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/create",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await API.post("/tasks", data);
      // refresh list
      dispatch(fetchTasks());
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Create failed" }
      );
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
      const res = await API.put("/tasks/" + id, data);
      dispatch(fetchTasks());
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Update failed" }
      );
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const res = await API.delete("/tasks/" + id);
      dispatch(fetchTasks());
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Delete failed" }
      );
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Fetch failed";
      })
      .addCase(createTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Create failed";
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Update failed";
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Delete failed";
      });
  },
});

export const { setFilters } = taskSlice.actions;
export default taskSlice.reducer;
