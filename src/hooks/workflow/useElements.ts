import { useDebouncedCallback } from "@hooks/useDebouncedCallback";
import { useUndoable } from "@hooks/useUndoable";
import { IAction } from "@store/action.slice";
import { useEffect } from "react";
import { useEdgesState, useNodesState } from "reactflow";

export function useElements() {
  const [nodes, setNodes, onNodesChange] = useNodesState<IAction>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [element, setElement, { undo, redo, reset }] = useUndoable(
    { nodes, edges },
    setNodes,
    setEdges
  );

  // Save the element state when it changes
  const updateElement = useDebouncedCallback((e) => setElement(e));
  useEffect(() => {
    updateElement({ nodes, edges });
  }, [edges, nodes, updateElement]);

  return [
    { nodes, setNodes, onNodesChange },
    { edges, setEdges, onEdgesChange },
    { undo, redo, reset },
  ];
}
