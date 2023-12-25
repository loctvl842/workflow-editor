import { createEntityAdapter, createSlice, EntityState } from "@reduxjs/toolkit";
import { RootState } from "@store";

export type LogValue = any;

export type ILog = {
  id: number;
  value: LogValue;
};

interface ILogState extends EntityState<ILog, number> {}

const logAdapter = createEntityAdapter<ILog>({
  sortComparer: (a, b) => b.id - a.id,
});

const initialState: ILogState = logAdapter.getInitialState();

const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    addLog: (state, action) => {
      const logValue = action.payload;
      logAdapter.addOne(state, {
        id: state.ids.length + 1,
        value: logValue,
      });
    },
  },
});

/*
 * ======================
 * reducers
 * ======================
 */
export default logSlice.reducer;

/*
 * ======================
 * actions
 * ======================
 */
export const { addLog } = logSlice.actions;

/*
 * ======================
 * Selectors
 * ======================
 */
export const { selectAll: selectAllLogs } = logAdapter.getSelectors<RootState>(
  (state) => state.log
);
