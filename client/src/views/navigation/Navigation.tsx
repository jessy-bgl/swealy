import { Box, Toolbar } from "@mui/material";

import { useState } from "react";
import NavigationDrawer from "./NavigationDrawer";
import NavigationToolbar from "./NavigationToolbar";

const drawerWidth = 240;

interface Props {
  child: JSX.Element;
  title: string;
}

export default function Navigation(props: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <NavigationToolbar
        title={props.title}
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <NavigationDrawer
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {props.child}
      </Box>
    </Box>
  );
}
