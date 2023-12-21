import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Handle, NodeProps, Position, ReactFlowState, useStore } from "reactflow";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

interface NodeBodyProps {
  showMenu?: boolean;
}

const StyledMenuButton = styled("div")(({ theme }) => ({
  border: "1px solid #ddd",
  borderRadius: "50%",
  backgroundColor: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
}));

const MenuButton = () => {
  return (
    <StyledMenuButton>
      <MoreHorizIcon style={{ fontSize: 10 }} />
    </StyledMenuButton>
  );
};

interface MenuTrayProps {
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

const MenuTray = (props) => {
  return (
    <StyledMenuTray showMenu={props.showMenu}>
      <MenuButton />
    </StyledMenuTray>
  );
};

export const NodeBody = styled("div")<NodeBodyProps>(({ theme, showMenu }) => {
  return {
    width: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#fff",
    padding: "10px",
    border: "1px solid #00a0ff",
    borderRadius: "8px",
    position: "relative",
    cursor: "pointer",
  };
});

export const FlowNode = (props: NodeProps) => {
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    console.log(showMenu);
  }, [showMenu]);
  return (
    <div>
      <NodeBody onMouseEnter={() => setShowMenu(true)} onMouseLeave={() => setShowMenu(false)}>
        <MenuTray showMenu={showMenu} />
        {props.id}
      </NodeBody>
    </div>
  );
};
