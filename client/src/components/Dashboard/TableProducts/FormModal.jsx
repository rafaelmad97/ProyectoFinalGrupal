
import React, { useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { addProducts, getAllCategorys } from "../../../redux/actions";

const shemmaUsuario = Yup.object({
  name: Yup.string().required("Este campo es requerido"),
  urlImage: Yup.string().url().required("Este campo es requerido"),
  description: Yup.string().required("Este campo es requerido"),
  stock: Yup.number().required("Este campo es requerido"),
  price: Yup.number().required("Este campo es requerido"),
});

const FormModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const allCategorys = useSelector((state) => state.allCategorys);

  useEffect(() => {
    dispatch(getAllCategorys());
  }, [dispatch]);

  const Formulario = useForm({
    defaultValues: {
      name: "",
      urlImage: "",
      description: "",
      stock: 0,
      price: 0,
      category: "",
    },
    resolver: yupResolver(shemmaUsuario),
  });

  const Submit = (data) => {
    console.log(data);
    Promise.resolve(dispatch(addProducts(data)))
      .then(() => console.log("agregado"))
      .catch(() => console.log("error no registrado"));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Products</DialogTitle>
      <DialogContent>
        <Card>
          <CardContent>
            <Grid container direction="row" spacing={1}>
              <Grid item xs={12} md={6} xl={4}>
                <Controller
                  name="name"
                  control={Formulario.control}
                  render={({ field, fieldState }) => (
                    <TextField
                      label="Nombre"
                      {...field}
                      onChange={(event) => {
                        field.onChange(event);
                        Formulario.trigger(field.name);
                      }}
                      error={Boolean(fieldState.error)}
                      helperText={fieldState.error?.message}
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={4}>
                <Controller
                  name="urlImage"
                  control={Formulario.control}
                  render={({ field, fieldState }) => (
                    <TextField
                      label="Image"
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
                  name="description"
                  control={Formulario.control}
                  render={({ field, fieldState }) => (
                    <TextField
                      label="Descripcion"
                      type="text"
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
                  name="stock"
                  control={Formulario.control}
                  render={({ field, fieldState }) => (
                    <TextField
                      label="Stock"
                      type="number"
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
                  name="price"
                  control={Formulario.control}
                  render={({ field, fieldState }) => (
                    <TextField
                      label="Precio"
                      type="number"
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
                  name="category"
                  control={Formulario.control}
                  render={({ field, fieldState }) => (
                    <>
                      <InputLabel id="category">Categoria</InputLabel>
                      <Select
                        labelId="category"
                        label="Category"
                        fullWidth
                        {...field}
                      >
                        {allCategorys.map((cat) => (
                          <MenuItem value={cat.name} key={cat.id}>
                            {cat.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </>
                  )}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={Formulario.handleSubmit(Submit)}>
          Registrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormModal;
