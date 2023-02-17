import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Home } from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";
import HandymanIcon from "@mui/icons-material/Handyman";
import PreviewIcon from "@mui/icons-material/Preview";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";

import { FC } from "react";

import prevod from "./prevod";
import useLanguage from "../../hooks/utils/useLanguage";

const handleClickHome = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

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

interface Props {
  text: string;
  icon: any;
  func: () => void;
}

export const BurgerMenuItem: FC<Props> = ({ text, icon, func }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={func}>
        <ListItemIcon style={{ color: "#41d2bf" }}>{icon}</ListItemIcon>
        <ListItemText style={{ color: "#41d2bf" }} primary={text} />
      </ListItemButton>
    </ListItem>
  );
};

export const BurgerMenu = () => {
  const lang = useLanguage(prevod);

  return (
    <List>
      <BurgerMenuItem text={lang.home} icon={<Home />} func={handleClickHome} />
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
  );
};
