import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DraftsIcon from "@mui/icons-material/Drafts";
import MenuIcon from "@mui/icons-material/Menu";
import PolylineIcon from "@mui/icons-material/Polyline";
import {
  Box,
  Collapse,
  CssBaseline,
  CSSObject,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  styled,
  Theme,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import { AppDispatch, RootState } from "@store";
import { fetchInitialWorkflow, selectAllWorkflows, IWorkflow } from "@store/workflow.slice";
import Image from "next/image";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const drawerWidth = 320;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  })
);

export const DashboardSidebar = (props: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const workflows = useSelector<RootState, IWorkflow[]>((state) => selectAllWorkflows(state));
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [workflowOpen, setWorkflowOpen] = useState(false);
  const handleWorkflowClick = () => {
    if (!open) return;
    setWorkflowOpen(!workflowOpen);
  };

  const handleDrawerClick = () => {
    setOpen((prev) => !prev);
    setWorkflowOpen(!open);
  };

  useEffect(() => {
    dispatch(fetchInitialWorkflow());
  }, [dispatch]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar
          sx={(theme) => ({
            backgroundColor: theme.palette.common[900],
            display: "flex",
            justifyContent: "space-between",
          })}
        >
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerClick}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <Image src="/static/loce.png" alt="logo" width={50} height={50}></Image>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={(theme) => ({
          backgroundColor: theme.palette.common[800],
        })}
      >
        <DrawerHeader>
          {/*   <IconButton onClick={handleDrawerClose}> */}
          {/*     {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />} */}
          {/*   </IconButton> */}
        </DrawerHeader>
        <Divider />

        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton onClick={handleWorkflowClick}>
            <ListItemIcon>
              <PolylineIcon />
            </ListItemIcon>
            <ListItemText primary="Workflow" />
            {workflowOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={workflowOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {workflows &&
                workflows.map((workflow) => (
                  <NextLink key={workflow.id} href={`/workflow/${workflow.id}`} passHref>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary={workflow.code} />
                    </ListItemButton>
                  </NextLink>
                ))}
            </List>
          </Collapse>
        </List>
      </Drawer>
    </Box>
  );
};
