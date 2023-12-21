import { useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { ChartBar as ChartBarIcon } from "../icons/chart-bar";
import { Cog as CogIcon } from "../icons/cog";
import { Lock as LockIcon } from "../icons/lock";
import { Selector as SelectorIcon } from "../icons/selector";
import { ShoppingBag as ShoppingBagIcon } from "../icons/shopping-bag";
import { User as UserIcon } from "../icons/user";
import { UserAdd as UserAddIcon } from "../icons/user-add";
import { Users as UsersIcon } from "../icons/users";
import { XCircle as XCircleIcon } from "../icons/x-circle";
// import { Logo } from "./logo";
import { NavItem } from "./nav-item";
import { RollerShades, Scanner, Share, FormatListBulleted } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../utils/fontawesome";
import { styled } from "@mui/material/styles";

const itemsUser = [
  {
    href: "/",
    icon: <LockIcon fontSize="small" />,
    title: "Home",
  },
  {
    href: "#",
    icon: <FormatListBulleted fontSize="small" />,
    title: "Diagnostic",
    subItems: [
      {
        href: "/benhkhopgoi",
        icon: <Share fontSize="small" />,
        title: "Knee Osteoarthritis",
      },
    ],
  },
  {
    href: "/historydiag",
    icon: <UserIcon fontSize="small" />,
    title: "History diagnostic",
  },
  {
    href: "/register-service",
    icon: <UserIcon fontSize="small" />,
    title: "Register service",
  },
];

const itemsTenant = [
  {
    href: "/tenant",
    icon: <LockIcon fontSize="small" />,
    title: "Manage User",
  },
  {
    href: "#",
    icon: <FormatListBulleted fontSize="small" />,
    title: "Diagnostic",
    subItems: [
      {
        href: "/tenant/benhkhopgoi",
        icon: <Share fontSize="small" />,
        title: "Knee Osteoarthritis",
      },
    ],
  },
  {
    href: "/tenant/historydiag",
    icon: <UserIcon fontSize="small" />,
    title: "History diagnostic",
  },
  {
    href: "/tenant/managepayment",
    icon: <CogIcon fontSize="small" />,
    title: "Manage payment",
  },
  {
    href: "/tenant/registerservice",
    icon: <CogIcon fontSize="small" />,
    title: "Register service",
  },
  {
    href: "/tenant/about",
    icon: <Scanner fontSize="small" />,
    title: "About Us",
  },
];

const itemsAdmin = [
  {
    href: "/admin",
    icon: <LockIcon fontSize="small" />,
    title: "System Management",
  },
  {
    href: "#",
    icon: <FormatListBulleted fontSize="small" />,
    title: "Diagnostic",
    subItems: [
      {
        href: "/admin/benhkhopgoi",
        icon: <Share fontSize="small" />,
        title: "Knee Osteoarthritis",
      },
    ],
  },
  {
    href: "/admin/historydiag",
    icon: <UserIcon fontSize="small" />,
    title: "History diagnostic",
  },
  {
    href: "/admin/managepayment",
    icon: <CogIcon fontSize="small" />,
    title: "Manage payment",
  },
];

export const DashboardSidebar = (props) => {
  const { open, onClose, role } = props;
  let items = [];
  let homeRef = "/";
  items = itemsUser;
  if (role === "admin") {
    items = itemsAdmin;
    homeRef = "/admin";
  } else if (role === "tenant") {
    items = itemsTenant;
    homeRef = "/tenant";
  } else if (role === "user") {
    items = itemsUser;
    homeRef = "/";
  }

  const router = useRouter();
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink href={homeRef}>
              <Logo>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/48165f60-7317-48bd-a5db-8cd7eec18d98?apiKey=989a6631d9bb4bf5b8bb7d79bb088c53&"
                  alt="Logo"
                />
                <Title>GMed AI</Title>
              </Logo>
            </NextLink>
            <NextLink href={homeRef} passHref>
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42,
                  }}
                />
              </a>
            </NextLink>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <>
              <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
              {item.subItems && (
                <Box pl={2}>
                  {item.subItems.map((subItem) => (
                    <NavItem
                      key={subItem.title}
                      icon={subItem.icon}
                      href={subItem.href}
                      title={subItem.title}
                    />
                  ))}
                </Box>
              )}
            </>
          ))}
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  role: PropTypes.string,
};

const Title = styled("div")(({ theme }) => ({
  // color: "var(--black, #000)",
  color: "#fff",
  textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  alignSelf: "center",
  whiteSpace: "nowrap",
  margin: "auto 0",
  font: "600 24px Roboto, sans-serif",
  [theme.breakpoints.down("md")]: {
    whiteSpace: "initial",
  },
}));

const Logo = styled("button")(({ theme }) => ({
  alignSelf: "center",
  display: "flex",
  alignItems: "flex-start",
  backgroundColor: "rgba(0,0,0,0)",
  border: "none",
  outline: "none",
  cursor: "pointer",
  gap: 7,
}));
