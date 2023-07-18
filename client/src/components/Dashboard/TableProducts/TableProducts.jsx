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
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FormModal from "./FormModal";
import {
  editProducts,
  getAllProducts,
  getAllCategorys,
  deleteProducts,
} from "../../../redux/actions";
import { schemmaProducto } from "./FormModal";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InformacionProducto from "./InformacionProducto";

function TableProducts() {
  const { allProducts, allCategorys } = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  const [openEdit, setEdit] = useState(false);
  const [reloadProducts, setReloadProducts] = useState(false);
  const dispatch = useDispatch();
  

  const Formulario = useForm({
    defaultValues: {
      name: "",
      urlImage: "",
      description: "",
      stock: 0,
      price: 0,
      categoryId: -1,
    },
    resolver: yupResolver(schemmaProducto),
  });

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategorys());
  }, [getAllProducts]);

  

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    Formulario.reset();
  };
  
  const handleUpdateProduct = (product) => {
    Formulario.reset({ ...product });
    setEdit(true);
  };
  
  const handleCloseUpdateProduct = () => {
    setEdit(false);
    Formulario.reset();
    setReloadProducts(true)
  };

  const handleDeleteProduct = (productId) => {
    alert("Estas seguro que quieres borrar el elemento del Dashboard")
    dispatch(deleteProducts(productId.id))
    .then(() => setReloadProducts(true)) // Establece el estado para recargar los productos
      .catch((error) => console.log(error));
  }

  const handleSubmit = (data) => {
    Promise.resolve(dispatch(editProducts(data)))
      .then(() => handleCloseUpdateProduct())
      .catch((e) => console.log(e))
      .finally();
  };

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategorys());

    if (reloadProducts) {
      setReloadProducts(false); // Resetea el estado de recarga
    }
  }, [dispatch, reloadProducts]);


  return (
    <Container fixed>
      <Dialog open={openEdit}>
        <DialogTitle> Editar Producto</DialogTitle>
        <DialogContent>
          <Grid container direction="row" spacing={1}>
            <FormProvider {...Formulario}>
              <InformacionProducto />
            </FormProvider>
          </Grid>
        </DialogContent>
        <DialogActions>
          <form onSubmit={Formulario.handleSubmit(handleSubmit)}>
            <Button color="primary" type="submit">
              Editar
            </Button>
          </form>
          <Button color="secondary" onClick={handleCloseUpdateProduct}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
      <Card>
        <CardContent>
          <h2>Products</h2>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button variant="contained" onClick={handleOpen}>
              Add
            </Button>
            <FormModal open={open} handleClose={handleClose} />

           
          </div>

          <Table sx={{ margin: "10px" }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Imagen</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Editar</TableCell>
                <TableCell>Eliminar</TableCell>
              
              </TableRow>
            </TableHead>
            <TableBody>
              {allProducts?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>
                    <img
                      src={item.urlImage}
                      alt={item.name}
                      style={{ width: "50px" }}
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>$/{item.price}.00</TableCell>
                  <TableCell>{item.stock}</TableCell>
                  <TableCell>
                    {[...allCategorys].find((cat) => cat.id === item.categoryId)?.name}
                  </TableCell>

                  <TableCell>
                    <div>
                      <IconButton onClick={() => handleUpdateProduct(item)}>
                        <EditIcon />
                      </IconButton>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <IconButton onClick={()=>handleDeleteProduct(item)} >
                        <DeleteIcon />
                      </IconButton>
                    </div>
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

export default TableProducts;
