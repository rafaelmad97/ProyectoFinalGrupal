
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
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { addCarrito, cleanCarrito, deleteAllItemCarrito, deleteOneItemCarrito } from "../../redux/actions";
import DeleteIcon from "@mui/icons-material/Delete";

function Carrito() {
  const {myCarrito} = useSelector((state) => state);
  const dispatch = useDispatch()
  console.log(myCarrito);

  // const [quantities, setQuantities] = useState({}); // Estado para almacenar las cantidades de productos
  // const [subtotal, setSubtotal] = useState(0); // Estado para almacenar el subtotal
  // const [total, setTotal] = useState(0);

  
  useEffect(() => {
    // Almacenar el carrito en el Local Storage cada vez que se actualice
    localStorage.setItem("carrito", JSON.stringify(myCarrito));
  }, [myCarrito]);

  // useEffect(() => {
    

  //   // Calcula el subtotal sumando el precio de cada producto en el carrito
  //   const subtotal = myCarrito.price * myCarrito.quantity


  //   // Calcula el total sumando el subtotal más los gastos de envío u otros cargos adicionales si los hubiera
  //   const total = subtotal + (18 * subtotal) / 100;

  //   // Actualiza el estado del subtotal y el total
  //   setSubtotal(subtotal);
  //   setTotal(total);
  // }, [quantities, myCarrito]);

  // const handleQuantityChange = (productId, value) => {
  //   setQuantities((prevQuantities) => ({
  //     ...prevQuantities,
  //     [productId]: parseInt(value, 10) || 0,
  //   }));
  // };

  
  const subtotal = myCarrito.reduce(
    (acc, car) => acc + car.price * car.quantity,
    0
  );
  const total = subtotal + (18 * subtotal) / 100;

  const handleIncrement = (productId) => {
    //myCarrito.quantity +1
    dispatch(addCarrito(productId))
  };

  const handleDecrement = (productId) => {
    // setQuantities((prevQuantities) => ({
    //   ...prevQuantities,
    //   [productId]: Math.max((prevQuantities[productId] || 0) - 1, 0),
    // }));
    dispatch(deleteOneItemCarrito(productId))
  };

  const handlePagar = () => {
    // Lógica para procesar el pago del carrito
    // Puedes agregar aquí tu propia implementación para realizar el pago
    console.log("Procesando el pago del carrito...");
  };

  

  return (
    <div>
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
                <img src={car.urlImage} alt={car.name} style={{ width: "50px" }} />
              </TableCell>
              <TableCell>{car.name}</TableCell>
              <TableCell>$/{car.price}.00</TableCell>
              <TableCell>
                <div>
                  <IconButton onClick={() => handleDecrement(car.id)} >
                    <RemoveIcon />
                  </IconButton>
                  {car.quantity}
                  <IconButton onClick={()=>handleIncrement(car.id)}>
                    <AddIcon />
                  </IconButton>
                </div>
              </TableCell>
              <TableCell>$/{car.price*car.quantity}.00</TableCell>
              <TableCell>
                <div>
                  <IconButton onClick={()=>dispatch(deleteAllItemCarrito(car.id))}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
        <Typography variant="h6">Resumen de la compra</Typography>
        <Typography variant="body2" color="text.secondary">
          Subtotal: $/{subtotal}.00
        </Typography>
        <Typography variant="body2" color="text.secondary">
          IGV: 18%
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Total: $/{total}.00
        </Typography>
        <Button variant="contained" onClick={handlePagar}>
          Pagar
        </Button>
        <Button onClick={()=>dispatch(cleanCarrito())} variant="contained">
          Limpiar Carrito
        </Button>
      </div>
    </div>
  );
}

export default Carrito
