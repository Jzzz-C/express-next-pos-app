import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useContext, useState } from "react";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import SettingsIcon from "@mui/icons-material/Settings";
import ClassIcon from "@mui/icons-material/Class";
import CategoryIcon from "@mui/icons-material/Category";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import MailIcon from "@mui/icons-material/Mail";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { AppContext } from "../contexts/AppContext";

const sidebarMenuItems = [
  { id: 1, label: "Orders", icon: <LocalMallIcon />, route: "/routes/orders" },
  {
    id: 2,
    label: "Menus",
    icon: <LocalDiningIcon />,
    route: "/routes/menus",
  },
  {
    id: 3,
    label: "Create A New Menu",
    icon: <FastfoodIcon />,
    route: "/routes/create-menu",
  },
  {
    id: 4,
    label: "Menu Categories",
    icon: <CategoryIcon />,
    route: "/routes/menu-categories",
  },
  // {
  //   id: 5,
  //   label: "Addons",
  //   icon: <LunchDiningIcon />,
  //   route: "/routes/addon",
  // },
  // {
  //   id: 6,
  //   label: "Addon Categories",
  //   icon: <ClassIcon />,
  //   route: "/routes/addon-categories",
  // },
  {
    id: 5,
    label: "Create Addons",
    icon: <LunchDiningIcon />,
    route: "/routes/create-addons",
  },
  {
    id: 6,
    label: "Locations",
    icon: <AddLocationIcon />,
    route: "/routes/locations",
  },
  {
    id: 7,
    label: "Settings",
    icon: <SettingsIcon />,
    route: "/routes/setting",
  },
];

const NavBar = () => {
  const { accessToken } = useContext(AppContext);

  const [open, setOpen] = useState<boolean>(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpen(open);
    };

  const drawerContent = () => {
    return (
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {sidebarMenuItems.slice(0, 6).map((item) => (
            <Link
              key={item.id}
              href={item.route}
              style={{ textDecoration: "none", color: "#313131" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {sidebarMenuItems.slice(-1).map((item) => (
            <Link
              key={item.id}
              href={item.route}
              style={{ textDecoration: "none", color: "#313131" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    );
  };

  const router = useRouter();

  const pageTitle = sidebarMenuItems.find(
    (item) => item.route === router.pathname
  )?.label;

  return (
    <Box sx={{ flexGrow: 1, position: "sticky" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={() => setOpen(true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {pageTitle ? pageTitle : "Home"}
          </Typography>
          <Link href={`${accessToken ? "/logout" : "/login"}`}>
            <Button color="inherit">
              {accessToken ? "Log Out" : "Log In"}
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {drawerContent()}
      </Drawer>
    </Box>
  );
};

export default NavBar;
