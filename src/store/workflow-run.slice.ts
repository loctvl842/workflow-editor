import { createAsyncThunk, createEntityAdapter, createSlice, EntityState } from "@reduxjs/toolkit";
import { RootState } from "@store";
import axios from "axios";
import { IAction } from "./action.slice";

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
      console.log(action);
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
>("workflowRun/trigger", async (payload, { getState }) => {
  const { workflowRun } = getState();
  try {
    const res = await axios.post(
      `/api/v1/internal/workflow-runs/${workflowRun.data.id}/trigger`,
      payload
    );
    return res.data;
  } catch (err) {
    console.log({err});
  }
});

/*
 * ======================
 * Selectors
 * ======================
 */
