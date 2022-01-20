import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Divider,
  List,
  Drawer,
  SvgIcon,
  Grid,
  Typography,
} from "@mui/material";
// import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import ExchangeIcon from "@mui/icons-material/AccountBalance";
import TransactionsIcon from "@mui/icons-material/History";
import AboutIcon from "@mui/icons-material/Info";
import ActiveDcaIcon from "@mui/icons-material/Paid";
import InactiveDcaIcon from "@mui/icons-material/Pause";
import ArchivedDcaIcon from "@mui/icons-material/Archive";

import ListItemWithIcon from "./components/ListItemTextIcon";
import { ReactComponent as Logo } from "../../assets/logo.svg";

interface Props {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

export default function NavigationDrawer(props: Props) {
  const { t } = useTranslation("navigation");

  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = useState(
    window.location.pathname || "/dca/active"
  );

  const handleClickItem = (linkToNavigate?) => {
    if (linkToNavigate) {
      setSelectedItem(linkToNavigate);
      props.handleDrawerToggle();
      navigate(linkToNavigate);
    }
  };

  const drawer = (
    <div>
      <div style={{ height: "64px", textAlign: "center" }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={1}
          sx={{ height: "100%" }}
        >
          <Grid item sx={{ marginTop: 0.7 }}>
            <SvgIcon component={Logo} inheritViewBox fontSize={"large"} />
          </Grid>
          <Grid item>
            <Typography variant="h6">Swealy</Typography>
          </Grid>
        </Grid>
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
          onClick={() => handleClickItem("/dca/active")}
          selected={selectedItem === "/dca/active"}
        />
        <ListItemWithIcon
          name={t("pausedDcas")}
          muiIcon={<InactiveDcaIcon />}
          onClick={() => handleClickItem("/dca/paused")}
          selected={selectedItem === "/dca/paused"}
        />
        <ListItemWithIcon
          name={t("archivedDcas")}
          muiIcon={<ArchivedDcaIcon />}
          onClick={() => handleClickItem("/dca/archived")}
          selected={selectedItem === "/dca/archived"}
        />
        <Divider />
        <ListItemWithIcon
          name={t("transactions")}
          muiIcon={<TransactionsIcon />}
          onClick={() => handleClickItem("/transactions")}
          selected={selectedItem === "/transactions"}
        />
        <ListItemWithIcon
          name={t("exchanges")}
          muiIcon={<ExchangeIcon />}
          onClick={() => handleClickItem("/exchanges")}
          selected={selectedItem === "/exchanges"}
        />
        <Divider />
        <ListItemWithIcon
          name={t("settings")}
          muiIcon={<SettingsIcon />}
          onClick={() => handleClickItem("/settings")}
          selected={selectedItem === "/settings"}
        />
        <ListItemWithIcon
          disabled
          name={t("about")}
          muiIcon={<AboutIcon />}
          onClick={() => handleClickItem("/about")}
          selected={selectedItem === "/about"}
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
