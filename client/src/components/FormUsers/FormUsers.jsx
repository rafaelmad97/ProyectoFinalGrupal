import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,

  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {string, object} from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { addUser, getAllUsers } from "../../redux/actions";
import { useEffect } from "react";
import UserInfo from "./UserInfo";

export const shemmaUsuario = object({
  
  name: string().required("Este campo es requerido"),
  lastName: string().required("Este campo es requerido"),
  email: string().email().required("Este campo es requerido"),
  password: string()
    .min(8, "la Contraseña es muy corta")
    .required("Este campo es requerido"),
  phone: string().required("Este campo es requerido"),
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
      id: 0,
      name: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      isactive: true,
      isadmin: false
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
            <FormProvider {...Formulario}>
                <UserInfo />
            </FormProvider>

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
