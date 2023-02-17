import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material/";
import Drawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Outlet } from "react-router-dom";
import { Home } from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";
import HandymanIcon from "@mui/icons-material/Handyman";
import PreviewIcon from "@mui/icons-material/Preview";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";

import { FC } from "react";

import LanguageSwitcherBurger from "../../components/LanguageSwitcherBurger";

import prevod from "./prevod";
import useLanguage from "../../hooks/utils/useLanguage";
import "./navbar.css";
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  background: "transparent",
  boxShadow: "none",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
}));

interface Props {
  text: string;
  icon: any;
  func: () => void;
}

const BurgerMenuItem: FC<Props> = ({ text, icon, func }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={func}>
        <ListItemIcon style={{ color: "#41d2bf" }}>{icon}</ListItemIcon>
        <ListItemText style={{ color: "#41d2bf" }} primary={text} />
      </ListItemButton>
    </ListItem>
  );
};

export default function PersistentBurgerMenu() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const lang = useLanguage(prevod);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClickHome = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setOpen(false);
  };

  const handleClickAbout = () => {
    const element = document.getElementById("aboutUs");

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  const handleClickServices = () => {
    const element = document.getElementById("services");

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  const handleClickPrevious = () => {
    const element = document.getElementById("previousWork");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  const handleClickContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      const elementRect = element.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const offset = 0.1;
      window.scrollTo({
        top: absoluteElementTop + offset,
        behavior: "smooth",
      });
      setOpen(false);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        open={open}
        style={{
          background: "transparent",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon className="navbar-icon" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#262626",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon className="navbar-icon" />
            ) : (
              <ChevronRightIcon className="navbar-icon" />
            )}
          </IconButton>
        </DrawerHeader>
        <LanguageSwitcherBurger />
        <Divider />
        <List>
          <BurgerMenuItem
            text={lang.home}
            icon={<Home />}
            func={handleClickHome}
          />
          <BurgerMenuItem
            text={lang.about}
            icon={<InfoIcon />}
            func={handleClickAbout}
          />
          <BurgerMenuItem
            text={lang.services}
            icon={<HandymanIcon />}
            func={handleClickServices}
          />
          <BurgerMenuItem
            text={lang.previousWork}
            icon={<PreviewIcon />}
            func={handleClickPrevious}
          />
          <BurgerMenuItem
            text={lang.contactUs}
            icon={<ConnectWithoutContactIcon />}
            func={handleClickContact}
          />
        </List>
      </Drawer>
      <Main
        open={open}
        style={{
          background: "transparent",
          position: "fixed",
        }}
      >
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}
