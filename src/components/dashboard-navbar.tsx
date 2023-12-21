import { useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Bell as BellIcon } from "../icons/bell";
import { UserCircle as UserCircleIcon } from "../icons/user-circle";
import { Users as UsersIcon } from "../icons/users";
import { useAuthContext } from "../contexts/auth-context";
import { useRouter } from "next/router";
import Link from "next/link";
const DashboardNavbarRoot = styled(AppBar)(({ theme }: any) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;
  const settingsRef = useRef(null);
  const [openAccountPopover, setOpenAccountPopover] = useState(false);
  const authContext: any = useAuthContext();
  const isAuthenticated = authContext.isAuthenticated || false;
  const router = useRouter();
  if (!isAuthenticated) {
    return (
      <>
        <DashboardNavbarRoot
          sx={{
            left: {
              // lg: 280,
            },
            width: {
              // lg: "calc(100% - 280px)",
            },
          }}
          {...other}
        >
          <Toolbar
            disableGutters
            sx={{
              // minHeight: 64,
              left: 0,
              px: 2,
            }}
          >
            <Box sx={{ flexGrow: 1 }} />

            <Avatar
              onClick={() => setOpenAccountPopover(true)}
              ref={settingsRef}
              sx={{
                cursor: "pointer",
                height: 40,
                width: 40,
                ml: 1,
              }}
              src="/static/images/avatars/avatar_1.png"
            >
              <UserCircleIcon fontSize="small" />
            </Avatar>
            <Typography variant="body1" style={{ color: "#000", padding: "0 15px" }}>
              Hello,
            </Typography>
          </Toolbar>
        </DashboardNavbarRoot>
      </>
    );
  } else {
    router
      .push({
        pathname: "/login",
      })
      .catch((err) => console.error(err));
  }
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
