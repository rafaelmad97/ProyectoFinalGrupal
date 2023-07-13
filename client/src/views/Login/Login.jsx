import {
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  TextField,
  Grid,
  Card,
  Link,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { Navigate, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { string, object} from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./Login.css";
import { loginLocallyUser } from "../../redux/actions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const shemmaLogin = object({
  email: string()
    .email("la dirección de correo electrónico debe ser valida")
    .required("Este campo es requerido"),
  password: string().required("Este campo es requerido"),
});

const Login = () => {
  const dispatcher = useDispatch();
  const { userAuthenticated } = useSelector((state) => state);
  const [Dialogo, setDialogo] = useState({
    open: false,
    title: "",
    message: "",
    isLogged: false,
  });
  const Nav = useNavigate();
  const Formulario_login = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(shemmaLogin),
  });

  const handleSubmit = (data) => {
    Promise.resolve(dispatcher(loginLocallyUser(data.email, data.password)))
      .then(() =>
        setDialogo({
          open: true,
          title: "Login Exitoso",
          message: "Usuario autenticado correctamente",
          isLogged: true,
        })
      )
      .catch((e) =>
        setDialogo({
          open: true,
          title: "Error",
          message:
            "Usuario no se ha podido autenticar correctamente, revisa tus credenciales ingresadas. Si el problema persiste.\n El usuario esta deshabilitado o contacta a servicio técnico.",
          isLogged: false,
        })
      )
      .finally(() => Formulario_login.setValue("password", ""));
  };

  const handleCloseDialog = (isLogged) => {
    setDialogo({
      open: false,
      title: "",
      message: "",
      isLogged: false,
    });
    if (isLogged) {
      Nav("/home");
    }
  };

  if(userAuthenticated?.user !== undefined){
    return <Navigate to={"/home"} replace={true} />
  }

  return (
    <Container fixed>
      <Dialog open={Dialogo.open}>
        <DialogTitle>{Dialogo.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{Dialogo.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleCloseDialog(Dialogo.isLogged);
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Card>
        <CardHeader title="Iniciar sesión"></CardHeader>
        <CardContent>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Controller
                name="email"
                control={Formulario_login.control}
                render={({ field, fieldState }) => (
                  <TextField
                    label="Correo electronico"
                    type="email"
                    {...field}
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name="password"
                control={Formulario_login.control}
                render={({ field, fieldState }) => (
                  <TextField
                    label="Contraseña"
                    type="password"
                    {...field}
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item className="linkUser">
              <Link href="/nuevousuario" color="secondary" underline="hover">
                ¿Eres nuevo?, Registrate
              </Link>
            </Grid>
          </Grid>
          <br />
        </CardContent>
        <form onSubmit={Formulario_login.handleSubmit(handleSubmit)}>
          <CardActions>
            <Grid container direction="row" spacing={1}>
              <Grid item xs={12} md={6} xl={6}>
                <Button
                  type="submit"
                  variant="contained"
                  className="button"
                  size="large"
                >
                  Iniciar sesión
                </Button>
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <Button
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                  color="secondary"
                  size="large"
                  fullWidth
                  href="http://localhost:3001/login/federated/google"
                >
                  Google
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </form>
      </Card>
    </Container>
  );
};

export default Login;
