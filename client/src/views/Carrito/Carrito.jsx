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
  removeFromCart,
  removeFromOneCart,
} from "../../redux/actions";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

function Carrito() {
  const { myCarrito, userAuthenticated } = useSelector((state) => state);
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
    const product = myCarrito.find((product) => product.id === productId)
    dispatch(addCarrito(productId));
    dispatch(incrementProductQuantity(userAuthenticated?.user.id, productId,  product?.quantity+1))
    console.log(productId);
  };

  const handleDecrement = (productId) => {
    const product = myCarrito.find((product) => product.id === productId)
    dispatch(deleteOneItemCarrito(productId));
    dispatch(incrementProductQuantity(userAuthenticated?.user.id, productId,  product?.quantity-1))
  };

  const habdelDeleteOneCarrito = (productId) => {
    alert("Estas seguro que quieres borrar el elemento del carrito")
    dispatch(deleteAllItemCarrito(productId))
    dispatch(removeFromOneCart(userAuthenticated?.user.id, productId))
  }

  const handleDeleteCarrito = () => {
    alert("Estas por eliminar tu carrito")
    dispatch(cleanCarrito())
    dispatch(removeFromCart(userAuthenticated?.user.id))
  }

  //pago de mercado pago
  const realizarCompra = async () => {

    if(userAuthenticated === undefined){
      alert("Para comprar necesitas registarte o iniciado la sesion");
    }else{
      try {
        const response = await axios.post("http://localhost:3001/payment", {carrito: myCarrito});
        const { init_point } = response.data;
        if (init_point) {
          window.location.href = init_point; 
        }
      } catch (error) {
        console.error("Error al realizar la compra:", error);
      }
    }
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
              {myCarrito?.length > 0 ? <>
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
                      <IconButton disabled={car.quantity === 1} onClick={() => handleDecrement(car.id)}>
                        <RemoveIcon />
                      </IconButton>
                      {car.quantity}
                      <IconButton disabled={car.stock<= car.quantity} onClick={() => handleIncrement(car.id)}>
                        <AddIcon />
                      </IconButton>
                    </div>
                  </TableCell>
                  <TableCell>$/{car.price * car.quantity}.00</TableCell>
                  <TableCell>
                    <div>
                      <IconButton
                        //onClick={() => {alert("Estas seguro que quieres borrar el elemento del carrito"); dispatch(deleteAllItemCarrito(car.id))}}
                        onClick={()=> habdelDeleteOneCarrito(car.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}</> : <><TableRow >

                <TableCell colSpan={6} align="center">
                  <Typography variant="body1" fontSize={18} >

                  No hay productos en el carrito
                  </Typography>
                </TableCell>
              </TableRow>
              </> }
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
                    <Button  variant="contained" disabled={myCarrito?.length === 0} onClick={realizarCompra}>
                      Pagar
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      //onClick={() => {alert("Estas por eliminar tu carrito"); dispatch(cleanCarrito())}}
                      onClick={()=>handleDeleteCarrito()}
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
