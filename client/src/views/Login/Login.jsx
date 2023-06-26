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
} from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import * as Yup from "Yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./Login.css";

const shemmaLogin = Yup.object({
  email: Yup.string()
    .email("la dirección de correo electrónico debe ser valida")
    .required("Este campo es requerido"),
  password: Yup.string().required("Este campo es requerido"),
});

const Login = () => {
  const Formulario_login = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(shemmaLogin),
  });

  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container fixed>
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
            <Button
              type="submit"
              variant="contained"
              className="button"
              size="large"
            >
              Iniciar sesión
            </Button>
          </CardActions>
        </form>
      </Card>
    </Container>
  );
};

export default Login;
