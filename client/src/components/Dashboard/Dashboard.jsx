import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import BarChartIcon from "@mui/icons-material/BarChart";
import MailIcon from "@mui/icons-material/Mail";
import { Carrito, Login } from "../../views";
import { yellow } from "@mui/material/colors";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { height } from "@mui/system";
import TableProducts from "./TableProducts/TableProducts";
import TableUsers from "./TableUser/TableUsers";
import { useSelector } from "react-redux";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    width: "1100px",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  boxShadow: "0px 2px 4px salmon",
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
  backgroundColor: "#666666",
}));

function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [componentePrincipal, setComponentePrincipal] = useState(null);
  const { userAuthenticated } = useSelector((state) => state);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const clickHome = () => {
    navigate("/home");
  };

  const renderComponentePrincipal = () => {
    switch (componentePrincipal) {
      case "users":
        return <TableUsers />;
      case "products":
        return <TableProducts />;
      default:
        return null;
    }
  };

  const handleClickUsers = () => {
    setComponentePrincipal("users");
  };
  const handleClickProducts = () => {
    setComponentePrincipal("products");
  };
  if (!userAuthenticated?.user.isadmin) {
    return <Navigate to={"/home"} replace={true} />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Box
            sx={{
              flexGrow: 0, // Ajustar el tamaño del contenedor
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end", // Alinear a la derecha
              cursor: "pointer",
              padding: "4px", // Ajustar el espacio interno
            }}
          >
            <Typography
              onClick={clickHome}
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontSize: "1.2rem", // Ajustar el tamaño de la fuente
              }}
            >
              Home
            </Typography>
          </Box>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end" // Utilizamos "end" en lugar de "start"
          >
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider
          sx={{ backgrounColor: "salmon", boxShadow: "2px 0px 4px red" }}
        />

        <Box sx={{ backgroundColor: "#cccccc", height: "100%" }}>
          <List>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <ListItemButton onClick={handleClickUsers}>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <Typography variant="body1">Users</Typography>
              </ListItemButton>

              <ListItemButton onClick={handleClickProducts}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <Typography variant="body1">Products</Typography>
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <Typography variant="body1">Estadisticas</Typography>
              </ListItemButton>
            </Box>
          </List>
          {/* <Divider
          sx={{ backgrounColor: "salmon", boxShadow: "2px 0px 4px red" }}
          /> */}
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Main open={open}>
        {renderComponentePrincipal() === null ? (
          <TableProducts />
        ) : (
          renderComponentePrincipal()
        )}
      </Main>
    </Box>
  );
}

export default Dashboard;
