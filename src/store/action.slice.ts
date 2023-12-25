import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
  Update,
} from "@reduxjs/toolkit";
import { RootState } from "@store";
import { PaginatedResponse } from "@types";
import axios from "axios";

export interface IActionTemplate {
  id: string;
  name: string;
  type: string;
  inputValidator: any;
  outputValidator: any;
}

export interface IAction {
  id: string;
  position: { x: number; y: number };
  name: string;
  actionType: string;
  input: any;
  workflowId: string;
  organizationId: string;
  template: any;
  connections: any[];
  createdAt: string;
  updatedAt: string;
  executed?: boolean;
  current?: boolean;
}

interface IActionState extends EntityState<IAction, string> {
  // TODO: Add other properties as needed
}

const actionAdapter = createEntityAdapter<IAction>();

const initialState: IActionState = {
  ...actionAdapter.getInitialState(),
};

const actionSlice = createSlice({
  name: "action",
  initialState,
  reducers: {
    updateActions: actionAdapter.updateMany,
    updateAction: actionAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInitialActions.fulfilled, (state, action) => {
      const { data } = action.payload;
      actionAdapter.setAll(state, data);
    });
  },
});

/*
 * ======================
 * reducers
 * ======================
 */
export default actionSlice.reducer;

/*
 * ======================
 * actions
 * ======================
 */
export const { updateActions } = actionSlice.actions;
export const fetchInitialActions = createAsyncThunk<PaginatedResponse<IAction>, string>(
  "action/fetchInitial",
  async (workflowId: string) => {
    const filter = JSON.stringify({ where: { workflowId } });
    const res = await axios.get(`/api/v1/internal/actions?filter=${encodeURIComponent(filter)}`);
    return res.data;
  }
);

export const updateAction = createAsyncThunk<any, Update<IAction, string>, { state: RootState }>(
  "action/updateOne",
  async ({ id, changes }, { getState }) => {
    const { action } = getState();
    const res = await axios.patch(`/api/v1/internal/actions/${id}`, changes);
    actionAdapter.updateOne(action, { id, changes: res.data });
  }
);

/*
 * ======================
 * Selectors
 * ======================
 */

export const { selectAll: selectAllActions } = actionAdapter.getSelectors<RootState>(
  (state) => state.action
);
