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

import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FormModal from "./FormModal";
import {
  getByName,
  orderByDate,
  orderByPrice,
  editProducts,
  getAllProducts,
  getAllCategorys,
} from "../../../redux/actions";
import { schemmaProducto } from "./FormModal";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InformacionProducto from "./InformacionProducto";

function TableProducts() {
  const { allProducts, allCategorys } = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  const [openEdit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [orderPrice, setOrderPrice] = useState("");
  const [orderDate, setOrderDate] = useState("");

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
  }, []);

  const handleOrderPrice = (event) => {
    dispatch(orderByPrice(event.target.value));
    setOrderPrice(event.target.value);
  };

  const handleOrderDate = (event) => {
    dispatch(orderByDate(event.target.value));
    setOrderDate(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    dispatch(getByName(searchValue));
    setSearchValue("");
  };

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
  };

  const handleSubmit = (data) => {
    Promise.resolve(dispatch(editProducts(data)))
      .then(() => handleCloseUpdateProduct())
      .catch((e) => console.log(e))
      .finally();
  };
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

            <form
              onSubmit={handleSearchSubmit}
              style={{ marginLeft: "100px", marginRight: "10px" }}
            >
              <TextField
                label="Search"
                value={searchValue}
                onChange={handleSearchChange}
                variant="outlined"
                size="small"
                sx={{ width: "150px", fontSize: "15px" }}
              />
              <IconButton type="submit">
                <SearchIcon />
              </IconButton>
            </form>

            <div
              style={{
                marginLeft: "20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <label
                htmlFor="select-order"
                style={{ marginRight: "10px", color: "black" }}
              >
                <h3>Ordenar por fecha:</h3>
              </label>
              <select
                id="select-order"
                value={orderDate}
                onChange={(event) => handleOrderDate(event)}
                style={{ marginRight: "20px" }}
              >
                <option value="">Seleccionar</option>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
              </select>

              <label
                htmlFor="select-order"
                style={{ marginRight: "10px", color: "black" }}
              >
                <h3>Ordenar por precio:</h3>
              </label>
              <select
                id="select-order"
                value={orderPrice}
                onChange={(event) => handleOrderPrice(event)}
                style={{ marginRight: "10px" }}
              >
                <option value="">Seleccionar</option>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
              </select>
            </div>
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
                <TableCell>Habilitar/Desabilitar</TableCell>
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
                      <IconButton>
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
