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
import ThemeIcon from "@mui/icons-material/Brightness6";

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
        muiIcon={<ThemeIcon />}
        action={() => appTheme.toggleMode()}
      />
    </Menu>
  );

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${props.drawerWidth}px)` },
          ml: { lg: `${props.drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.handleDrawerToggle}
            sx={{ mr: 2, display: { lg: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div">
            {props.title}
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", lg: "flex" } }}>
            <Tooltip title={t("theme").toString()} arrow>
              <IconButton onClick={() => appTheme.toggleMode()}>
                <ThemeIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ display: { xs: "flex", lg: "none" } }}>
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
