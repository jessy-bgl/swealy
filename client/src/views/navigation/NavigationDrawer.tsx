import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Box, Divider, List, Drawer } from "@mui/material";
// import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import ExchangeIcon from "@mui/icons-material/AccountBalance";
import TransactionsIcon from "@mui/icons-material/History";
import AboutIcon from "@mui/icons-material/Info";
import ActiveDcaIcon from "@mui/icons-material/Paid";
import InactiveDcaIcon from "@mui/icons-material/PaidOutlined";
import ArchivedDcaIcon from "@mui/icons-material/AccountBalanceWallet";

import ListItemWithIcon from "./components/ListItemTextIcon";
import { useState } from "react";

interface Props {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

export default function NavigationDrawer(props: Props) {
  const { t } = useTranslation("navigation");

  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = useState("activeDcas");

  const handleClickItem = (name, linkToNavigate?) => {
    if (linkToNavigate) {
      setSelectedItem(name);
      props.handleDrawerToggle();
      navigate(linkToNavigate);
    }
  };

  const drawer = (
    <div>
      <div style={{ height: "64px", textAlign: "center" }}>
        {/* TODO : add a logo */}
      </div>
      <Divider />
      <List>
        {/* <ListItemWithIcon
          name={t("dashboard")}
          muiIcon={<DashboardIcon />}
          linkToNavigate="/"
          closeDrawer={props.handleDrawerToggle}
        /> */}
        <ListItemWithIcon
          name={t("activeDcas")}
          muiIcon={<ActiveDcaIcon />}
          onClick={() => handleClickItem("activeDcas", "/dca/active")}
          selected={selectedItem === "activeDcas"}
        />
        <ListItemWithIcon
          name={t("pausedDcas")}
          muiIcon={<InactiveDcaIcon />}
          onClick={() => handleClickItem("pausedDcas", "/dca/paused")}
          selected={selectedItem === "pausedDcas"}
        />
        <ListItemWithIcon
          name={t("archivedDcas")}
          muiIcon={<ArchivedDcaIcon />}
          onClick={() => handleClickItem("archivedDcas", "/dca/archived")}
          selected={selectedItem === "archivedDcas"}
        />
        <Divider />
        <ListItemWithIcon
          disabled
          name={t("transactions")}
          muiIcon={<TransactionsIcon />}
          onClick={() => handleClickItem("transactions", "/transactions")}
          selected={selectedItem === "transactions"}
        />
        <ListItemWithIcon
          name={t("exchanges")}
          muiIcon={<ExchangeIcon />}
          onClick={() => handleClickItem("exchanges", "/exchanges")}
          selected={selectedItem === "exchanges"}
        />
        <Divider />
        <ListItemWithIcon
          name={t("settings")}
          muiIcon={<SettingsIcon />}
          onClick={() => handleClickItem("settings", "/settings")}
          selected={selectedItem === "settings"}
        />
        <ListItemWithIcon
          disabled
          name={t("about")}
          muiIcon={<AboutIcon />}
          onClick={() => handleClickItem("about", "/about")}
          selected={selectedItem === "about"}
        />
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { lg: props.drawerWidth }, flexShrink: { lg: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={props.mobileOpen}
        onClose={props.handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", lg: "none" },
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
          display: { xs: "none", lg: "block" },
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
