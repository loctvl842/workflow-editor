import { createAsyncThunk, createEntityAdapter, createSlice, EntityState } from "@reduxjs/toolkit";
import { RootState } from "@store";
import axios from "axios";
import { IAction } from "./action.slice";
import { addLog } from "./log.slice";

export interface IWorkflowRun {
  id: string;
  currentActionId: string;
  executedActions: IAction[];
  status: string;
  runErrors: any[];
}

interface IWorkflowRunState {
  data?: IWorkflowRun;
}

const initialState: IWorkflowRunState = {};

const workflowRunSlice = createSlice({
  name: "workflowRun",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(newWorkflowRun.fulfilled, (state, action) => {
      const { payload } = action;
      state.data = payload;
    });
    builder.addCase(triggerWorkflowRun.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(triggerWorkflowRun.rejected, (state, action) => {
      state = action.payload;
    });
  },
});

/*
 * ======================
 * reducers
 * ======================
 */
export default workflowRunSlice.reducer;

/*
 * ======================
 * actions
 * ======================
 */
export const newWorkflowRun = createAsyncThunk<IWorkflowRun, string>(
  "workflowRun/new",
  async (workflowId: string) => {
    try {
      const res = await axios.post(`/api/v1/internal/workflows/${workflowId}/workflow-runs`);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const triggerWorkflowRun = createAsyncThunk<
  IWorkflowRun,
  { [key: string]: any },
  { state: RootState }
>("workflowRun/trigger", async (payload, { getState, rejectWithValue, dispatch }) => {
  const { workflowRun } = getState();
  try {
    const res = await axios.post(
      `/api/v1/internal/workflow-runs/${workflowRun.data.id}/trigger`,
      payload
    );
    return res.data;
  } catch (err) {
    workflowRun.data.runErrors ??= [];
    workflowRun.data.runErrors.push(err.response.data);
    return rejectWithValue(workflowRun);
  }
});

/*
 * ======================
 * Selectors
 * ======================
 */
