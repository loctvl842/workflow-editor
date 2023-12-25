import AddIcon from "@mui/icons-material/Add";
import { ListItemIcon, ListItemText, MenuItem, MenuList, Paper, Typography } from "@mui/material";
import { ActionEditor } from "@components/workflow";
import { useState } from "react";
import { IAction } from "@store/action.slice";

interface NodeMenuProps {
  action: IAction;
}

export const NodeMenu = (props: NodeMenuProps) => {
  const { action } = props;
  const [openActionEditor, setOpenActionEditor] = useState(false);

  return (
    <Paper sx={{ width: 320, maxWidth: "100%" }}>
      <ActionEditor action={action} open={openActionEditor} onClose={() => setOpenActionEditor(false)} />
      <MenuList>
        <MenuItem onClick={() => setOpenActionEditor(true)}>
          <ListItemIcon>
            <AddIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit Action</ListItemText>
          <Typography variant="body2" color="text.secondary">
            {/* key map here */}
          </Typography>
        </MenuItem>
      </MenuList>
    </Paper>
  );
};
