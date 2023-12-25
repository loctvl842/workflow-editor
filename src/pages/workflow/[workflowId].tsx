import { DashboardLayout } from "@components/dashboard-layout";
import { ConnectionLine, FloatingEdge, FlowNode, Logger } from "@components/workflow";
import { useDebouncedCallback } from "@hooks/useDebouncedCallback";
import useUndoable from "@hooks/useUndoable/useUndoable";
import { useActions, useElements } from "@hooks/workflow";
import { Box, Button, ButtonGroup, Container, Fade, Grid, Menu, MenuItem } from "@mui/material";
import { AppDispatch, RootState } from "@store";
import { fetchInitialActions, IAction, selectAllActions, updateActions } from "@store/action.slice";
import { addLog } from "@store/log.slice";
import { IWorkflowRun, newWorkflowRun, triggerWorkflowRun } from "@store/workflow-run.slice";
import _ from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Edge,
  MarkerType,
  Node,
  NodeTypes,
  updateEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

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

const LoggerButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Logger
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <Logger />
      </Menu>
    </>
  );
};
const Buttons = ({ undo, redo, reset, newRunner, trigger }) => {
  return (
    <ButtonGroup
      variant="contained"
      aria-label="outlined primary button group"
      sx={{
        position: "absolute",
        right: 10,
        top: 10,
      }}
    >
      <Button onClick={undo}>Undo</Button>
      <Button onClick={redo}>Redo</Button>
      <Button onClick={reset}>Reset</Button>
      <Button onClick={newRunner}>New Runner</Button>
      <Button onClick={trigger}>Trigger</Button>
      <LoggerButton />
    </ButtonGroup>
  );
};

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { workflowId } = router.query;
  if (_.isArray(workflowId)) {
    throw new Error("Invalid workflowId");
  }
  // States
  const [
    { nodes, setNodes, onNodesChange },
    { edges, setEdges, onEdgesChange },
    { undo, redo, reset },
  ] = useElements();
  const actions = useActions(workflowId);

  const workflowRun = useSelector<RootState, IWorkflowRun>((state) => state.workflowRun.data);

  // handlers
  const trigger = () => {
    dispatch(triggerWorkflowRun({}));
  };
  const newRunner = () => {
    dispatch(newWorkflowRun(workflowId as string));
  };
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // initialize nodes and edges
  useEffect(() => {
    if (_.isEmpty(nodes)) {
      const actionNodes: Node<IAction, string>[] = actions.map((action) => ({
        id: action.id,
        type: "custom",
        position: action.position,
        data: action,
      }));
      setNodes(actionNodes);
    }
    if (_.isEmpty(edges)) {
      const actionEdges = _.flatMap(actions, ({ id: source, connections }) =>
        connections && connections.length > 0
          ? connections.map(({ outputValue, nextActionId: target }) => ({
              id: `${outputValue}-${source}-${target}`,
              source,
              target,
              // label: outputValue,
              data: {
                startLabel: outputValue,
              },
              style: { strokeWidth: 2, stroke: "black" },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: "black",
              },
            }))
          : []
      );
      setEdges(actionEdges);
    }
  }, [actions, edges, nodes, setEdges, setNodes]);

  // Update state when workflow run triggered
  useEffect(() => {
    if (_.isNil(workflowRun)) return;
    const executedActionIds = workflowRun.executedActions.map((action) => action.id);
    const updates = executedActionIds.map((id) => ({ id, changes: { executed: true } }));

    setNodes((nds) =>
      nds.map((node) => {
        return _.merge({}, node, {
          data: {
            executed: _.includes(executedActionIds, node.data.id),
            current: workflowRun.currentActionId === node.data.id,
          },
        });
      })
    );
    dispatch(updateActions(updates));
    // update active edges
    setEdges((eds) =>
      eds.map((edge) =>
        _.merge({}, edge, { animated: edge.source === workflowRun.currentActionId })
      )
    );
  }, [dispatch, setEdges, setNodes, workflowRun]);

  return (
    <>
      <Head>
        <title>Littlelives | Workflow</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Box style={{ width: "100%", height: "100vh", position: "relative" }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            connectionLineComponent={ConnectionLine}
            connectionLineStyle={connectionLineStyle}
          >
            <Background />
          </ReactFlow>
          <Buttons undo={undo} redo={redo} reset={reset} newRunner={newRunner} trigger={trigger} />
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page: JSX.Element) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
