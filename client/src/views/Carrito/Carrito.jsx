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
  incrementProductQuantity,
} from "../../redux/actions";
import DeleteIcon from "@mui/icons-material/Delete";
//import Dashboard from "../../components/Dashboard.jsx";

function Carrito() {
  const { cart, userAuthenticated } = useSelector((state) => state);
  const dispatch = useDispatch();

  const subtotal = cart.reduce(
    (acc, car) => acc + car.product.product.price * car.product.product.quantity,
    0
  );
  const total = subtotal + (18 * subtotal) / 100;

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(cart));
  }, [cart]);

  const handleIncrement = ( userId, productId) => {
    dispatch(incrementProductQuantity( productId));
  };

  const handleDecrement = (productId) => {
    dispatch(deleteOneItemCarrito(userId, {id: productId}));
  };

  const handlePagar = () => {
    console.log("Procesando el pago del carrito...");
  };

  console.log("carrito", cart);

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
              {cart?.map((car) => (
                <TableRow key={car.product.product.id}>
                  <TableCell>
                    <img
                      src={car.product.product.urlImage}
                      alt={car.product.product.name}
                      style={{ width: "50px" }}
                    />
                  </TableCell>
                  <TableCell>{car.product.product.name}</TableCell>
                  <TableCell>$/{car.product.product.price}.00</TableCell>
                  <TableCell>
                    <div>
                      <IconButton onClick={() => handleDecrement(car.user.id, car.product.id)}>
                        <RemoveIcon />
                      </IconButton>
                      {car.product.product.quantity}
                      <IconButton onClick={() => handleIncrement(car.id)}>
                        <AddIcon />
                      </IconButton>
                      {/* {userAuthenticated === undefined} ? 
                      (
                      (
                        {userAuthenticated.user.profile?.provider === "google"} ? 
                        (
                          <IconButton onClick={() => handleDecrement(car.id)}>
                           <RemoveIcon />
                          </IconButton>
                          {car.quantity}
                          <IconButton onClick={() => handleIncrement(car.id)}>
                            <AddIcon />
                          </IconButton>
                        ) :
                        (
                          <IconButton onClick={() => handleDecrement(car.id)}>
                            <RemoveIcon />
                          </IconButton>
                          {car.quantity}
                          <IconButton onClick={() => handleIncrement(userAuthenticated.user.id, car.id)}>
                            <AddIcon />
                          </IconButton>
                        )
                      ) */}
                      
                    </div>
                  </TableCell>
                  <TableCell>$/{car.product.product.price * car.product.product.quantity}.00</TableCell>
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


