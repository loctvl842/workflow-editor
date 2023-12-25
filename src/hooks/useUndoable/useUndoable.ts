import { IAction } from "@store/action.slice";
import { Dispatch, SetStateAction, useCallback, useReducer } from "react";
import { Edge, Node } from "reactflow";
import { reducer } from "./reducer";
import type { MutationBehavior, Options, UseUndoable } from "./types";

const initialState = {
  past: [],
  present: null,
  future: [],
};

const defaultOptions: Options = {
  behavior: "mergePastReversed",
  historyLimit: 100,
  ignoreIdenticalMutations: true,
  cloneState: false,
};

const compileMutateOptions = (options: Options) => ({
  ...defaultOptions,
  ...options,
});

const useUndoable = <T = any>(
  initialPresent: T,
  setNodes: Dispatch<SetStateAction<Node<IAction, string>[]>>,
  setEdges: Dispatch<SetStateAction<Edge<any>[]>>,
  options: Options = defaultOptions
): UseUndoable<T> => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    present: initialPresent,
  });

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => {
    if (canUndo) {
      dispatch({ type: "undo", setNodes, setEdges });
    }
  }, [canUndo, setEdges, setNodes]);

  const redo = useCallback(() => {
    if (canRedo) {
      dispatch({ type: "redo", setNodes, setEdges });
    }
  }, [canRedo, setEdges, setNodes]);

  const reset = useCallback(
    (payload = initialPresent) => dispatch({ type: "reset", payload }),
    [initialPresent]
  );
  const resetInitialState = useCallback(
    (payload: any) => dispatch({ type: "resetInitialState", payload }),
    []
  );

  const update = useCallback(
    (payload: any, mutationBehavior: MutationBehavior, ignoreAction: boolean) =>
      dispatch({
        type: "update",
        payload,
        behavior: mutationBehavior,
        ignoreAction,
        ...compileMutateOptions(options),
      }),
    [options]
  );

  // We can ignore the undefined type error here because
  // we are setting a default value to options.
  const setState = useCallback(
    (
      payload: any,

      // @ts-ignore
      mutationBehavior: MutationBehavior = options.behavior,
      ignoreAction: boolean = false
    ) => {
      return update(payload, mutationBehavior, ignoreAction);
    },
    [options.behavior, update]
  );

  // In some rare cases, the fact that the above setState
  // function changes on every render can be problematic.
  // Since we can't really avoid this (setState uses
  // state.present), we must export another function that
  // doesn't depend on the present state (and thus doesn't
  // need to change).
  const static_setState = (
    payload: any,

    // @ts-ignore
    mutationBehavior: MutationBehavior = options.behavior,
    ignoreAction: boolean = false
  ) => {
    update(payload, mutationBehavior, ignoreAction);
  };

  return [
    state.present,
    setState,
    {
      past: state.past,
      future: state.future,

      undo,
      canUndo,
      redo,
      canRedo,

      reset,
      resetInitialState,
      static_setState,
    },
  ];
};

export default useUndoable;
