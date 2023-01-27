import * as React from "react";
import "../../styles/navbar.css";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { Button, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import useLanguage from "../../hooks/utils/useLanguage";
import prevod from "./prevod";

//import useWindowDimensions from "../../hooks/useWindowDimensions";

import LanguageSwitcher from "../LanguageSwitcher";
const drawerWidth = 240;

enum textColor {
  LIGHT = "#F2F2F2",
  DARK = "#262626",
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
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

export default function Navbar() {
  const navigate = useNavigate();
  const lang = useLanguage(prevod);
  const [isVisible, setIsVisible] = React.useState(false);
  const [currentUrl, setCurrentUrl] = React.useState("");
  const [currentColor, setCurrentColor] = React.useState(textColor.LIGHT);

  React.useEffect(() => {
    setCurrentUrl(window.location.href);

    // Podesavanje boje navbara
    window.addEventListener("scroll", (event) => {
      event.preventDefault();

      const navbarEl = document.querySelector(".Navbar") as HTMLElement;
      const pwSection = document.querySelector("#previousWork") as HTMLElement;
      const navbarRect = navbarEl.getBoundingClientRect();
      const pwSectionRect = pwSection.getBoundingClientRect();

      let newColor =
        navbarRect.top < pwSectionRect.bottom &&
        navbarRect.bottom > pwSectionRect.top
          ? textColor.DARK
          : textColor.LIGHT;

      if (newColor !== currentColor) setCurrentColor(newColor);
    });
  }, [currentColor]);

  const handleClickAbout = () => {
    const element = document.getElementById("aboutUs");
    if (currentUrl === "/home") {
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/home");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" }); //Ne radi
      }
    }
  };

  const handleClickPrevious = () => {
    const element = document.getElementById("previousWork");
    if (currentUrl === "/home") {
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/home");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleClickHome = () => {
    if (currentUrl === "/home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      navigate("/home");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <AppBar
      className="Navbar"
      position="fixed"
      style={{
        background: "transparent",
        boxShadow: "none",
      }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <Toolbar>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Grid container alignItems="center" spacing={9}>
                <Grid item>
                  <IconButton
                    onClick={handleClickHome}
                    sx={{ borderRadius: 0 }}
                    disableRipple
                  >
                    <img
                      src={"./3nity-logo-v2.png"}
                      alt="Logo"
                      style={{ height: "160px", marginRight: "10px" }}
                    />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    sx={{ borderRadius: 0 }}
                    onClick={handleClickAbout}
                    disableRipple
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ color: currentColor }}
                      className="hover-underline-animation"
                    >
                      {lang.about}
                    </Typography>
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton sx={{ borderRadius: 0 }} disableRipple>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: currentColor }}
                      className="hover-underline-animation"
                    >
                      {lang.services}
                    </Typography>
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    sx={{ borderRadius: 0 }}
                    onClick={handleClickPrevious}
                    disableRipple
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ color: currentColor }}
                      className="hover-underline-animation"
                    >
                      {lang.previousWork}
                    </Typography>
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    sx={{ borderRadius: 0 }}
                    onClick={() => {
                      navigate("/contact");
                    }}
                    disableRipple
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ color: currentColor }}
                      className="hover-underline-animation"
                    >
                      {lang.contactUs}
                    </Typography>
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ marginRight: 7, overflow: "visible" }}>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={10}
              >
                <Grid item>
                  <Button
                    variant="outlined"
                    className="fill"
                    sx={{ borderColor: currentColor, color: currentColor }}
                  >
                    {lang.freeCall}
                  </Button>
                </Grid>
                <Grid item>
                  <LanguageSwitcher />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </motion.div>
    </AppBar>
  );
}
