import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Button,
  List,
  ListItemAvatar,
  ListItemText,
  Divider,
  ListItemButton,
  Menu,
  MenuItem,
  Dialog,
  TextField,
  Grid,
  CardContent,
  Avatar,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";

import "./NavBar.css";
import { useNavigate, Link } from "react-router-dom";
import NAVLOGO from "../../assets/logo.svg";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getByName,
  logoutUserSessionGoogle,
  logoutUserSessionLocal,
  cleanCarrito
} from "../../redux/actions";
import FilterAndSort from "../Filtros/FilterAndSort/FilterAndSort";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

export const NavBar = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [Resultados, setResultados] = useState([]);
  const { userAuthenticated } = useSelector((state) => state);

  const [open, setOpen] = useState(false);
  const id = open ? "open-menu" : undefined;

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  useEffect(() => {
    handleSearch();
  }, [searchValue]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutUserSessionGoogle());
    dispatch(logoutUserSessionLocal());
    dispatch(cleanCarrito());
    handleClose();
  };

  const handleSearch = (event) => {
    Promise.resolve(dispatch(getByName(searchValue)))
      .then((result) => setResultados(result))
      .catch((err) => alert(err.message))
      .finally();
  };

  const Nav = useNavigate();

  const handleHome = () => {
    Nav("/home");
  };



  const handleLogin = () => {
    Nav("/login");
  };

  const handleSetSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleOpenSearchDialog = () => {
    setOpen(true);
  };

  const handleCloseSearchDialog = () => {
    setOpen(false);
    setSearchValue("");
  };

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar aria-describedby={id}>
          <img src={NAVLOGO} className="logo" />
          <br />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            className="title"
            onClick={handleHome}
          >
            Pro Hardware Market
          </Typography>

          <Search onClick={handleOpenSearchDialog}>
            <IconButton color="inherit" size="large" onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              disabled={true}
            />
          </Search>

          <div className="nav-item">
            {userAuthenticated === undefined ? (
              <IconButton color="inherit" size="large" onClick={handleLogin}>
                <AccountCircleIcon color="secondary" />
              </IconButton>
            ) : (
              <>
                {userAuthenticated.user.profile?.provider === "google" ? (
                  <Avatar
                    alt={userAuthenticated.user.profile.name?.familyName}
                    src={userAuthenticated.user.profile.photos[0]?.value}
                    onClick={handleClick}
                  />
                ) : (
                  <>
                    <Avatar color="secondary" onClick={handleClick}>
                      {`${userAuthenticated.user.name}`.charAt(0)}
                    </Avatar>
                  </>
                )}
              </>
            )}
          </div>

          <Link to={"/carrito"} className="nav-item">
            <IconButton style={{ color: "white" }}>
              <ShoppingCartIcon />
            </IconButton>
          </Link>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >

            {userAuthenticated?.user.isadmin &&
          <MenuItem onClick={()=> Nav("/dashboard")}>
            Dashboard
            </MenuItem>}
            <MenuItem onClick={handleLogout}>Cerrar Sesion</MenuItem>

          </Menu>
        </Toolbar>
      </AppBar>
      <Dialog open={open} onClose={handleCloseSearchDialog} value={searchValue}>
        <CardContent>
          <Grid container direction={"column"} justifyContent="stretch">
            <Grid item>
              <TextField
                label="Buscar Producto"
                onChange={handleSetSearch}
                fullWidth
              />
            </Grid>
            <Grid item>
              <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                {Resultados.map((value) => (
                  <>
                    <ListItemButton
                      alignItems="flex-start"
                      onClick={() => {
                        handleCloseSearchDialog();
                        Nav(`/detail/${value.id}`);
                      }}
                    >
                      <ListItemAvatar>
                        <img src={value.urlImage} className="item-result" />
                      </ListItemAvatar>
                      <ListItemText primary={value.name} />
                    </ListItemButton>
                    <Divider variant="inset" component="li" />
                  </>
                ))}
              </List>
            </Grid>
          </Grid>
        </CardContent>
      </Dialog>
    </Box>
    {/* <FilterAndSort/> */}
  </>
  );
};
