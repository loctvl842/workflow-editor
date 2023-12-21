import { ConnectionLine, FloatingEdge, FlowNode } from "@components/workflow";
import { useDebouncedCallback } from "@hooks/useDebouncedCallback";
import useUndoable from "@hooks/useUndoable/useUndoable";
import { Box, Container, Grid } from "@mui/material";
import Head from "next/head";
import { useCallback, useEffect } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Edge,
  MarkerType,
  NodeTypes,
  updateEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { DashboardLayout } from "../components/dashboard-layout";

const initialNodes = [
  {
    id: "1",
    type: "custom",
    data: { label: "An input node" },
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    type: "custom",
    data: { label: "An input node" },
    position: { x: 250, y: 320 },
  },
  {
    id: "3",
    type: "custom",
    data: { label: "An input node" },
    position: { x: 40, y: 300 },
  },
  {
    id: "4",
    type: "custom",
    data: { label: "An input node" },
    position: { x: 300, y: 0 },
  },
];

const initialEdges = [];

const connectionLineStyle = {
  strokeWidth: 3,
  stroke: "black",
};

const nodeTypes: NodeTypes = {
  custom: FlowNode,
};

const edgeTypes = {
  floating: FloatingEdge,
};
const defaultEdgeOptions = {
  style: { strokeWidth: 3, stroke: "black" },
  type: "floating",
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "black",
  },
};

const Button = ({ children, ...props }) => (
  <button {...props} className="j-button app gray mh-0-5r">
    {children}
  </button>
);

const Buttons = ({ undo, redo, reset }) => (
  <div className="fixed top-16 right-16 flex flex-row">
    <Button onClick={() => undo()}>Undo</Button>
    <Button onClick={() => redo()}>Redo</Button>
    <Button onClick={() => reset()}>Reset</Button>
  </div>
);
const Page = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [element, setElement, { undo, redo, reset }] = useUndoable(
    {
      nodes,
      edges,
    },
    setNodes,
    setEdges
  );

  const updateElement = useDebouncedCallback((e) => setElement(e));
  useEffect(() => {
    updateElement({ nodes, edges });
  }, [edges, nodes, updateElement]);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  return (
    <>
      <Head>
        <title>Rockship | Workflow</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <div style={{ width: "100vw", height: "100vh" }}>
          <Buttons undo={undo} redo={redo} reset={reset} />
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            defaultEdgeOptions={defaultEdgeOptions}
            connectionLineComponent={ConnectionLine}
            connectionLineStyle={connectionLineStyle}
          >
            <Background />
          </ReactFlow>
        </div>
      </Box>
    </>
  );
};

Page.getLayout = (page: JSX.Element) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
