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
  Card,
  CardContent,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {
  addCarrito,
  cleanCarrito,
  deleteAllItemCarrito,
  deleteOneItemCarrito,
} from "../../redux/actions";
import DeleteIcon from "@mui/icons-material/Delete";

function Carrito() {
  const { myCarrito } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(myCarrito));
  }, [myCarrito]);

  const subtotal = myCarrito.reduce(
    (acc, car) => acc + car.price * car.quantity,
    0
  );
  const total = subtotal + (18 * subtotal) / 100;

  const handleIncrement = (productId) => {
    dispatch(addCarrito(productId));
  };

  const handleDecrement = (productId) => {
    dispatch(deleteOneItemCarrito(productId));
  };

  const handlePagar = () => {
    console.log("Procesando el pago del carrito...");
  };

  return (
    <Container fixed>
      <Card>
        <CardContent>
          <h1>Carrito</h1>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Imagen</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Subtotal</TableCell>
                <TableCell>Eliminar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myCarrito?.map((car) => (
                <TableRow key={car.id}>
                  <TableCell>
                    <img
                      src={car.urlImage}
                      alt={car.name}
                      style={{ width: "50px" }}
                    />
                  </TableCell>
                  <TableCell>{car.name}</TableCell>
                  <TableCell>$/{car.price}.00</TableCell>
                  <TableCell>
                    <div>
                      <IconButton onClick={() => handleDecrement(car.id)}>
                        <RemoveIcon />
                      </IconButton>
                      {car.quantity}
                      <IconButton onClick={() => handleIncrement(car.id)}>
                        <AddIcon />
                      </IconButton>
                    </div>
                  </TableCell>
                  <TableCell>$/{car.price * car.quantity}.00</TableCell>
                  <TableCell>
                    <div>
                      <IconButton
                        onClick={() => dispatch(deleteAllItemCarrito(car.id))}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Typography variant="h6">Resumen de la compra</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="text.secondary">
                  Subtotal: $/{subtotal}.00
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="text.secondary">
                  IGV: 18%
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="text.secondary">
                  Total: $/{total}.00
                </Typography>
              </Grid>
              <Grid item>
                <Grid container direction="row" spacing={1}>
                  <Grid item>
                    <Button variant="contained" onClick={handlePagar}>
                      Pagar
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={() => dispatch(cleanCarrito())}
                      variant="contained"
                    >
                      Limpiar Carrito
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Carrito;
