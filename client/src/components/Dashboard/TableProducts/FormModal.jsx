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
import { useForm, Controller, FormProvider } from "react-hook-form";
import { object, string, number } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { addProducts, getAllCategorys } from "../../../redux/actions";
import InformacionProducto from "./InformacionProducto";

export const schemmaProducto = object({
  name: string().required("Este campo es requerido"),
  urlImage: string() /*.url()*/
    .required("Este campo es requerido"),
  description: string().required("Este campo es requerido"),
  stock: number().required("Este campo es requerido"),
  price: number().required("Este campo es requerido"),
});

const FormModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategorys());
  }, [dispatch]);

  const Formulario = useForm({
    defaultValues: {
      id: 1,
      name: "",
      urlImage: "",
      description: "",
      stock: 0,
      price: 0,
      categoryId: -1,
      isactive: true,
    },
    resolver: yupResolver(schemmaProducto),
  });

  const Submit = (data) => {
    console.log(data);
    Promise.resolve(dispatch(addProducts(data)))
      .then(() => handleClose())
      .catch(() => console.log("error no registrado"));
  };

  const handleCloseCreate = () => {
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Products</DialogTitle>
      <DialogContent>
        <Grid container direction="row" spacing={1}>
          <FormProvider {...Formulario}>
            <InformacionProducto />
          </FormProvider>
        </Grid>
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
