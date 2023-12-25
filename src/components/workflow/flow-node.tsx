import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Handle, NodeProps, Position, ReactFlowState, useStore } from "reactflow";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { NodeMenu } from "./node-menu";
import Popover from "@mui/material/Popover";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { IAction } from "@store/action.slice";

interface MenuTrayProps {
  action?: IAction;
  showMenu?: boolean;
}

const StyledMenuTray = styled("div")<MenuTrayProps>(({ theme, showMenu }) => ({
  height: "20px",
  background: "transparent",
  position: "absolute",
  top: "0",
  left: "0",
  right: "0",
  transform: "translateY(-100%)",
  display: "flex",
  flexDirection: "row-reverse",
  justifyContent: "space-between",
  alignItems: "center",
  visibility: showMenu ? "visible" : "hidden",
}));

const MenuTray = (props: MenuTrayProps) => {
  const { showMenu, action } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <StyledMenuTray showMenu={showMenu}>
      <IconButton aria-describedby={id} size="small" style={{ padding: 2 }} onClick={handleClick}>
        <MoreHorizIcon style={{ fontSize: '1rem' }} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <NodeMenu action={action} />
      </Popover>
    </StyledMenuTray>
  );
};

interface NodeBodyProps {
  current?: boolean;
}
export const NodeBody = styled(Box)<NodeBodyProps>(({ theme, current }) => {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: current ? theme.palette.primary.dark : theme.palette.common[600],
    padding: "5px",
    border: "1px solid #00a0ff",
    borderColor: current ? theme.palette.common[900] : theme.palette.common[500],
    color: "#fff",
    borderRadius: "8px",
    position: "relative",
    cursor: "pointer",
  };
});
interface ExecutionIndicatorProps {
  executed?: boolean;
}
const ExecutionIndicator = styled("div")<ExecutionIndicatorProps>(({ theme, executed }) => {
  return {
    margin: 5,
    width: 15,
    height: 15,
    borderRadius: 5,
    background: executed ? theme.palette.success.main : theme.palette.common[400],
  };
});

export const FlowNode = (props: NodeProps<IAction>) => {
  const { data: action } = props;
  const [showMenu, setShowMenu] = useState(false);
  const onConnect = (params) => console.log("handle onConnect", params);

  return (
    <div>
      <Handle type="target" position={Position.Left} onConnect={onConnect} />
      <NodeBody
        current={action.current}
        onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
      >
        <MenuTray showMenu={showMenu} action={action} />
        <Typography variant="body1">{action.name}</Typography>
        <ExecutionIndicator executed={action.executed} />
      </NodeBody>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};
