import { createAsyncThunk, createEntityAdapter, createSlice, EntityState } from "@reduxjs/toolkit";
import { RootState } from "@store";
import axios from "axios";

export interface IWorkflow {
  id: string;
  type: string;
  code: string;
  name: string;
  organizationId: string;
  triggerActionId: string;
  createdAt: string;
  updatedAt: string;

  // TODO: Add other properties as needed
}

interface IWorkflowState extends EntityState<IWorkflow, string> {
  // TODO: Add other properties as needed
}

const workflowAdapter = createEntityAdapter<IWorkflow>();

const initialState: IWorkflowState = {
  ...workflowAdapter.getInitialState(),
};

const workflowSlice = createSlice({
  name: "workflow",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchInitialWorkflow.fulfilled, (state, action) => {
      const { data } = action.payload;
      workflowAdapter.setAll(state, data);
    });
  },
});

/*
 * ======================
 * reducers
 * ======================
 */
export default workflowSlice.reducer;

/*
 * ======================
 * actions
 * ======================
 */

/*
 * Async thunk for fetching initial data
 */
export const fetchInitialWorkflow = createAsyncThunk("workflow/fetchInitial", async () => {
  const res = await axios.get("/api/v1/internal/workflows");
  return res.data;
});

/*
 * ======================
 * Selectors
 * ======================
 */
export const { selectAll: selectAllWorkflows, selectById: selectWorkflowById } = workflowAdapter.getSelectors<RootState>(
  (state) => state.workflow
);
