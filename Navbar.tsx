import * as React from "react";
import "../../styles/navbar.css";
import { createTheme } from "@mui/material/styles";
import { useMediaQuery } from "@material-ui/core";
import TopMenu from "./TopMenu";
import PersistentBurgerMenu from "./PersistentBurgerMenu";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1440,
      xl: 1920,
    },
  },
});

export default function Navbar() {
  const matches = useMediaQuery(theme.breakpoints.down("lg"));

  return <>{matches ? <PersistentBurgerMenu /> : <TopMenu />}</>;
}
