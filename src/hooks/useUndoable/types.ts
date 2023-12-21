export type ActionType = "undo" | "redo" | "update" | "reset" | "resetInitialState";

export type HistoryLimit = number | "infinium" | "infinity";

export type MutationBehavior = "mergePastReversed" | "mergePast" | "destroyFuture" | "keepFuture";

export interface Action {
  type: ActionType;
  payload?: any;
  behavior?: MutationBehavior;
  historyLimit?: HistoryLimit;
  ignoreIdenticalMutations?: boolean;
  cloneState?: boolean;
  ignoreAction?: boolean;
  setNodes?: Dispatch<SetStateAction<Node<NodeData, string | undefined>[]>>;
  setEdges?: Dispatch<SetStateAction<Edge<EdgeData>[]>>;
}

export interface State {
  past: any[];
  present: any;
  future: any[];
}

export interface Options {
  behavior?: MutationBehavior;
  historyLimit?: HistoryLimit;
  ignoreIdenticalMutations?: boolean;
  cloneState?: boolean;
}

export type UseUndoable<T> = [
  T,
  (payload: T | ((oldValue: T) => T), behavior?: MutationBehavior, ignoreAction?: boolean) => void,
  {
    past: T[];
    future: T[];

    undo: () => void;
    canUndo: boolean;
    redo: () => void;
    canRedo: boolean;

    reset: (initialState?: T) => void;
    resetInitialState: (newInitialState: T) => void;
    static_setState: (payload: T, behavior?: MutationBehavior, ignoreAction?: boolean) => void;
  },
];
