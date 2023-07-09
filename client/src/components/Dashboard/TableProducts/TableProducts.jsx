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
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FormModal from "./FormModal";
import { getByName } from "../../../redux/actions";

function TableProducts() {
  const { allProducts } = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    dispatch(getByName(searchValue))
    // setSearchValue("")
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container fixed>
      <Card>
        <CardContent>
          <h2>Products</h2>
          <div>
            <Button variant="contained" onClick={handleOpen}>
              Add
            </Button>
            <FormModal open={open} handleClose={handleClose} />
          </div>
          <form onSubmit={handleSearchSubmit}>
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

          <Table>
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
                  <TableCell>Categoria</TableCell>
                  <TableCell>
                    <div>
                      <IconButton>
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
