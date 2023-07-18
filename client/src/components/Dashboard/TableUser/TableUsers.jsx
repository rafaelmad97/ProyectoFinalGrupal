import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  IconButton,
  Button,
  Container,
  Grid,
  InputBase,
  Card,
  CardContent,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  FormControlLabel,
  Switch,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import { getAllUsers, editUser } from "../../../redux/actions";
import { FormProvider, useForm } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoUser from "./InfoUser";
import { shemmaUsuario } from "../../FormUsers/FormUsers";
import { yupResolver } from "@hookform/resolvers/yup";
//import Dashboard from "../../components/Dashboard.jsx";

function TableUsers() {
  const { allUser } = useSelector((state) => state);
  const [openEdit, setEdit] = useState(false);
  const dispatch = useDispatch();
  console.log(allUser);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const Formulario = useForm({
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      isactive: true,
      isadmin: false,
    },
    resolver: yupResolver(shemmaUsuario),
  });

  const handleUpdateUser = (users) => {
    Formulario.reset({ ...users });
    setEdit(true);
  };

  const handleCloseUpdateUser = () => {
    setEdit(false);
    Formulario.reset();
  };

  const handleSubmit = (data) => {
    Promise.resolve(dispatch(editUser(data)))
      .then(() => handleCloseUpdateUser())
      .catch((e) => console.log(e))
      .finally();
  };

  const handleActive = (Usuario, checked) =>
    Promise.resolve(dispatch(editUser({ ...Usuario, isactive: checked })))
      .then(() => dispatch(getAllUsers()))
      .finally();
  const handleAdmin = (Usuario, checked) =>
    Promise.resolve(dispatch(editUser({ ...Usuario, isadmin: checked })))
      .then(() => dispatch(getAllUsers()))
      .finally();

  return (
    <Container fixed>
      <Dialog open={openEdit}>
        <DialogTitle> Editar Usuario</DialogTitle>
        <DialogContent>
          <Grid container direction="row" spacing={1}>
            <FormProvider {...Formulario}>
              <InfoUser />
            </FormProvider>
          </Grid>
        </DialogContent>
        <DialogActions>
          <form onSubmit={Formulario.handleSubmit(handleSubmit)}>
            <Button color="primary" type="submit">
              Editar
            </Button>
          </form>
          <Button color="secondary" onClick={handleCloseUpdateUser}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
      <Card>
        <CardContent>
          <h2>Usuarios</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellidos</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell>Telefono</TableCell>
                {/* <TableCell>Rol</TableCell>
                <TableCell>Editar</TableCell>
                <TableCell>Eliminar</TableCell> */}
                <TableCell>Administradores</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUser
                ?.sort((a, b) => a.id - b.id)
                .map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.lastName}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    {/* <TableCell>{item.isadmin}</TableCell>
                  <TableCell>
                    <div>
                      <IconButton onClick={()=>handleUpdateUser(item)}>
                        <EditIcon />
                      </IconButton>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </TableCell> */}
                    <TableCell>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={item.isadmin}
                            onChange={(e) =>
                              handleAdmin(item, e.currentTarget.checked)
                            }
                          />
                        }
                        label={`${item.isadmin ? "Admin" : "Usuario"}`}
                      />
                    </TableCell>
                    <TableCell>
                      <FormControlLabel
                        control={<Switch checked={item.isactive} />}
                        label={`${
                          item.isactive ? "Habilitado" : "Deshabilitado"
                        }`}
                        onChange={(e) =>
                          handleActive(item, e.currentTarget.checked)
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Container>
  );
}

export default TableUsers;
