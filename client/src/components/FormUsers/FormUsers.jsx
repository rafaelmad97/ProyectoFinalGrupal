import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "Yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
  };

  return (
    <Container>
      <br />
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
