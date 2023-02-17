import * as React from "react";
import useLanguage from "../../hooks/utils/useLanguage";
import prevod from "./prevod";
import { Button, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import LanguageSwitcher from "../LanguageSwitcher";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import "./navbar.css"

enum textColor {
  LIGHT = "#FEFEFE",
  DARK = "#262626",
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth = 240;

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

const TopMenu = () => {
  const lang = useLanguage(prevod);
  const [currentColor, setCurrentColor] = React.useState(textColor.LIGHT);
  const [isVisible, setIsVisible] = React.useState(false);
  const newColorRef = React.useRef(textColor.LIGHT);

  React.useEffect(() => {
    // Podesavanje boje navbara
    window.addEventListener("scroll", (event) => {
      event.preventDefault();

      const navbarEl = document.querySelector(".Navbar") as HTMLElement;
      const pwSection = document.querySelector("#previousWork") as HTMLElement;
      const pwSection2 = document.querySelector("#textSection") as HTMLElement;

      if (navbarEl) {
        const navbarRect = navbarEl.getBoundingClientRect();
        const pwSectionRect = pwSection.getBoundingClientRect();
        const pwSectionRect2 = pwSection2.getBoundingClientRect();

        if (
          (navbarRect.top < pwSectionRect.bottom &&
            navbarRect.bottom > pwSectionRect.top) ||
          (navbarRect.top < pwSectionRect2.bottom &&
            navbarRect.bottom > pwSectionRect2.top)
        ) {
          newColorRef.current = textColor.DARK;
        } else {
          newColorRef.current = textColor.LIGHT;
        }

        if (newColorRef.current !== currentColor)
          setCurrentColor(newColorRef.current);
      }
    });
  }, [currentColor]);

  const handleClickAbout = () => {
    const element = document.getElementById("aboutUs");

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClickServices = () => {
    const element = document.getElementById("services");

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClickPrevious = () => {
    const element = document.getElementById("previousWork");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
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
    }
  };

  const handleClickHome = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
        animate={{ opacity: isVisible ? 1 : 0.3 }}
        transition={{ duration: 0.3 }}
      >
        <Toolbar>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Grid container alignItems="center" spacing="56px">
                <Grid item>
                  <IconButton
                    onClick={handleClickHome}
                    sx={{ borderRadius: 0 }}
                    disableRipple
                  >
                    <img
                      src={"./3nity-logo-v2.png"}
                      alt="Logo"
                      className="navbar-logo"
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
                      color={currentColor}
                      className="hover-underline-animation navbar-text"
                    >
                      {lang.about}
                    </Typography>
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    sx={{ borderRadius: 0 }}
                    onClick={handleClickServices}
                    disableRipple
                  >
                    <Typography
                      color={currentColor}
                      className="hover-underline-animation navbar-text"
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
                      color={currentColor}
                      className="hover-underline-animation navbar-text"
                    >
                      {lang.previousWork}
                    </Typography>
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    sx={{ borderRadius: 0 }}
                    onClick={handleClickContact}
                    disableRipple
                  >
                    <Typography
                      color={currentColor}
                      className="hover-underline-animation navbar-text"
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
};

export default TopMenu;
