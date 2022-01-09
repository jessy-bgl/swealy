import { useTranslation } from "react-i18next";
import { Box, Divider, List, Drawer } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import ExchangeIcon from "@mui/icons-material/AccountBalance";
import TransactionsIcon from "@mui/icons-material/History";

import ListItemWithIcon from "./components/ListItemTextIcon";

interface Props {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

export default function NavigationDrawer(props: Props) {
  const { t } = useTranslation("navigation");

  const drawer = (
    <div>
      <div style={{ height: "64px", textAlign: "center" }}>
        {/* TODO : add a logo */}
      </div>
      <Divider />
      <List>
        <ListItemWithIcon
          name={t("dashboard")}
          muiIcon={<DashboardIcon />}
          linkToNavigate="/"
          closeDrawer={props.handleDrawerToggle}
        />
        <ListItemWithIcon
          disabled
          name={t("transactions")}
          muiIcon={<TransactionsIcon />}
          linkToNavigate="/transactions"
          closeDrawer={props.handleDrawerToggle}
        />
        <ListItemWithIcon
          disabled
          name={t("exchanges")}
          muiIcon={<ExchangeIcon />}
          linkToNavigate="/exchanges"
          closeDrawer={props.handleDrawerToggle}
        />
        <ListItemWithIcon
          disabled
          name={t("settings")}
          muiIcon={<SettingsIcon />}
          linkToNavigate="/settings"
          closeDrawer={props.handleDrawerToggle}
        />
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: props.drawerWidth }, flexShrink: { md: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={props.mobileOpen}
        onClose={props.handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: props.drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: props.drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
