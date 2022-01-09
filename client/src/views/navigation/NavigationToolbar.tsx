import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  AppBar,
  Box,
  IconButton,
  Menu,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import InfoIcon from "@mui/icons-material/Info";

import TooltipNavButtonWithIcon from "./components/TooltipNavIconButton";
import MenuItemWithIcon from "./components/MenuItemIconButton";
import { useThemeContext } from "../../services/stores/theme/useThemeContext";

interface Props {
  title: string;
  drawerWidth: number;
  handleDrawerToggle: () => void;
}

const NavigationToolbar = (props: Props) => {
  const { t } = useTranslation("navigation");

  const appTheme = useThemeContext();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItemWithIcon
        name={t("theme")}
        muiIcon={<Brightness6Icon />}
        action={() => appTheme.toggleMode()}
      />
      <MenuItemWithIcon name={t("about")} muiIcon={<InfoIcon />} />
    </Menu>
  );

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${props.drawerWidth}px)` },
          ml: { md: `${props.drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {props.title}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Tooltip title={t("theme").toString()} arrow>
              <IconButton onClick={() => appTheme.toggleMode()}>
                <Brightness6Icon />
              </IconButton>
            </Tooltip>
            <TooltipNavButtonWithIcon
              title={t("about")}
              muiIcon={<InfoIcon />}
            />
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
};

export default NavigationToolbar;
