import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { automationAPI } from '../../services/api';

export const fetchAutomations = createAsyncThunk(
  'automations/fetchAutomations',
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await automationAPI.getAutomations(projectId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createAutomation = createAsyncThunk(
  'automations/createAutomation',
  async (automationData, { rejectWithValue }) => {
    try {
      const response = await automationAPI.createAutomation(automationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateAutomation = createAsyncThunk(
  'automations/updateAutomation',
  async ({ id, automationData }, { rejectWithValue }) => {
    try {
      const response = await automationAPI.updateAutomation(id, automationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAutomation = createAsyncThunk(
  'automations/deleteAutomation',
  async (id, { rejectWithValue }) => {
    try {
      await automationAPI.deleteAutomation(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const automationSlice = createSlice({
  name: 'automations',
  initialState: {
    automations: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAutomations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAutomations.fulfilled, (state, action) => {
        state.loading = false;
        state.automations = action.payload;
      })
      .addCase(fetchAutomations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAutomation.fulfilled, (state, action) => {
        state.automations.push(action.payload);
      })
      .addCase(updateAutomation.fulfilled, (state, action) => {
        const index = state.automations.findIndex(
          (automation) => automation._id === action.payload._id
        );
        if (index !== -1) {
          state.automations[index] = action.payload;
        }
      })
      .addCase(deleteAutomation.fulfilled, (state, action) => {
        state.automations = state.automations.filter(
          (automation) => automation._id !== action.payload
        );
      });
  },
});

export default automationSlice.reducer;