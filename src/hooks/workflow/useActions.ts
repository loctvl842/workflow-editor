import { AppDispatch, RootState } from "@store";
import { fetchInitialActions, IAction, selectAllActions } from "@store/action.slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useActions(workflowId: string) {
  const dispatch = useDispatch<AppDispatch>();
  const actions = useSelector<RootState, IAction[]>((state) => selectAllActions(state));

  useEffect(() => {
    dispatch(fetchInitialActions(workflowId as string));
  }, [dispatch, workflowId]);

  return actions
}
