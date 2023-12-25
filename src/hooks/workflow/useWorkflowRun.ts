import { RootState } from "@store";
import { IWorkflowRun } from "@store/workflow-run.slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLog } from "@store/log.slice";

export function useWorkflowRun() {
  const dispatch = useDispatch();
  const workflowRun = useSelector<RootState, IWorkflowRun>((state) => state.workflowRun.data);
  useEffect(() => {
    dispatch(addLog(workflowRun.runErrors[workflowRun.runErrors.length - 1]));
  }, [dispatch, workflowRun.runErrors]);
  return workflowRun;
}
