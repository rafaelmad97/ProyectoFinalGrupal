import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  TextField,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "Yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { addUser, getAllUsers } from "../../redux/actions";
import { useEffect } from "react";

const shemmaUsuario = Yup.object({
  name: Yup.string().required("Este campo es requerido"),
  lastName: Yup.string().required("Este campo es requerido"),
  email: Yup.string().email().required("Este campo es requerido"),
  password: Yup.string()
    .min(8, "la Contraseña es muy corta")
    .required("Este campo es requerido"),
  phone: Yup.string().required("Este campo es requerido"),
});

const FormUsers = () => {
  const [Dialogo, setDialogo] = useState({
    open: false,
    title: "",
    message: "",
  });
  const dispatch = useDispatch();
  const allUser = useSelector((state) => state.allUser);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  console.log("users", allUser);

  const Formulario = useForm({
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      rol: "User",
    },
    resolver: yupResolver(shemmaUsuario),
  });

  const Submit = (data) => {
    console.log(data);
    Promise.resolve(dispatch(addUser(data)))
      .then((res) =>
        setDialogo({
          open: true,
          title: "Usuario Agregado",
          message: "El usuario se agregó correctamente\n",
        })
      )
      .catch((e) =>
        setDialogo({
          open: true,
          title: "Error",
          message: e.message,
        })
      )
      .finally();
  };

  const handleResetDialog = () => {
    setDialogo({
      open: false,
      title: "",
      message: "",
    });
  };

  return (
    <Container>
      <br />
      <Dialog open={Dialogo.open}>
        <DialogTitle>{Dialogo.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{Dialogo.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleResetDialog} color="secondary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Card>
        <CardHeader title="Registro de usuario" />
        <CardContent>
          <Grid container direction="row" spacing={1}>
            <Grid item xs={12} md={6} xl={4}>
              <Controller
                name="name"
                control={Formulario.control}
                render={({ field, fieldState }) => (
                  <TextField
                    label="Nombres"
                    {...field}
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={4}>
              <Controller
                name="lastName"
                control={Formulario.control}
                render={({ field, fieldState }) => (
                  <TextField
                    label="Apellidos"
                    {...field}
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={4}>
              <Controller
                name="email"
                control={Formulario.control}
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
            <Grid item xs={12} md={6} xl={4}>
              <Controller
                name="password"
                control={Formulario.control}
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
            <Grid item xs={12} md={6} xl={4}>
              <Controller
                name="phone"
                control={Formulario.control}
                render={({ field, fieldState }) => (
                  <TextField
                    label="Telefono"
                    type="number"
                    {...field}
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={12} xl={12}>
              <form onSubmit={Formulario.handleSubmit(Submit)}>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  size="large"
                >
                  Registrar
                </Button>
              </form>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default FormUsers;
