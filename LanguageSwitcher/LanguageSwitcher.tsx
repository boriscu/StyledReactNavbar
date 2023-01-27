import React, { useState, useContext } from "react";
import { getLanguage } from "../../utils/language";
import LanguageContext from "../../contexts/LanguageContext";
import LanguageIcon from "@mui/icons-material/Language";
import prevod from "./prevod";
import { IconButton, Box, Tooltip, Menu, MenuItem } from "@mui/material";

enum textColor {
  LIGHT = "#F2F2F2",
  DARK = "#262626",
}

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const languageData = getLanguage(prevod, language);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [currentColor, setCurrentColor] = React.useState(textColor.LIGHT);

  React.useEffect(() => {
    window.addEventListener("scroll", () => {
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
  }, [currentColor, language]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (lang: string) => {
    if (typeof lang === "string") {
      setLanguage(lang);
    } else {
      setLanguage(language);
    }
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title={languageData.changeLang}>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <LanguageIcon sx={{ fontSize: "30px", color: currentColor }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        disableScrollLock={true}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => handleClose("en")}>{languageData.en}</MenuItem>
        <MenuItem onClick={() => handleClose("lat")}>
          {languageData.lat}
        </MenuItem>
        <MenuItem onClick={() => handleClose("cir")}>
          {languageData.cir}
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default LanguageSwitcher;
