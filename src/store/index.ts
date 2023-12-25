import { configureStore } from "@reduxjs/toolkit";
import actionReducer from "./action.slice";
import logReducer from './log.slice';
import workflowRunReducer from "./workflow-run.slice";
import workflowReducer from "./workflow.slice";

const store = configureStore({
  reducer: {
    action: actionReducer,
    log: logReducer,
    workflowRun: workflowRunReducer,
    workflow: workflowReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
