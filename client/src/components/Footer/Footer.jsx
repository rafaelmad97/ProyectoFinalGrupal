import {
  Paper,
  Box,
  Typography,
  FormControl,
  Button,
  TextField,
} from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookSharpIcon from "@mui/icons-material/FacebookSharp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Box1 = styled(Box)({
  width: { xs: "60%", sm: "70%" },
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "0 0.5rem",
  paddingBottom: "4rem",
});

const Box2 = styled(Typography)(({ theme }) => ({
  width: "100%",
  background:
    "linear-gradient(0deg, rgba(253,253,255,1) 0%, rgba(126,126,126,1) 0%, rgba(255,255,255,1) 100%)",
  display: "flex",
  paddingBottom: "4rem",
  [theme.breakpoints.down("sm")]: {
    paddingLeft: "1.5rem",
  },
}));

const Footer = () => {
  return (
    <Paper
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box1>
        <Typography
          variant="h5"
          sx={{ marginBottom: "0.8rem", marginTop: "1rem" }}
        >
          Enterate de las Novedades!
        </Typography>
        <Typography style={{ marginBottom: "1rem", textAlign: "center" }}>
          ¡No olvide mantenerse en contacto con nosotros para obtener
          información instantánea sobre nuevos productos!
        </Typography>
        <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
          <FormControl fullWidth sx={{ m: 2 }}>
            <TextField id="outlined-basic" label="E-mail" variant="outlined" />
          </FormControl>
          <Button sx={{ height: "55px", width: "80px" }} variant="contained">
            <ArrowForwardIcon />
          </Button>
        </Box>
      </Box1>
      <Box2>
        <Box
          style={{
            flex: "1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <h3>Encontranos en:</h3>
            <p>
              Argentina <br />
              Perú
              <br />
              Colombia
            </p>
            <h3>Teléfono:</h3>
            <p>0880 7541 9874</p>
          </Box>
        </Box>
        <Box
          style={{
            flex: "1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h3>Seguinos :</h3>
          <ul style={{ listStyle: "none" }}>
            <li>
              <a href="https://www.instagram.com/" style={{ color: "black" }}>
                <InstagramIcon />
              </a>
            </li>
            <li>
              <a href="https://facebook.com/" style={{ color: "black" }}>
                <FacebookSharpIcon />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/mevlut-keles-435607215"
                style={{ color: "black" }}
              >
                <LinkedInIcon />
              </a>
            </li>
          </ul>
        </Box>
      </Box2>
    </Paper>
  );
};

export default Footer;
