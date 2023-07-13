import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { addCarrito, addProductToCart,incrementProductQuantity } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

import "./Card.css";

const Cards = (props) => {
  const { userAuthenticated, myCarrito } = useSelector((State) => State);
  const { name, urlImage, price, id } = props;
  const dispatch = useDispatch();

  const handleAgregarCarrito = () => {
    dispatch(addCarrito(id));
    const product = myCarrito.find((product) => product.id === id) 
    if (product === undefined) {
      dispatch(addProductToCart(userAuthenticated?.user.id, id, 1));
    }else{
      dispatch(incrementProductQuantity(userAuthenticated?.user.id, id, product.quantity+1))
    }
  };

  return (
    <Card elevation={4} sx={{ maxWidth: 345, height:550 }}>
      <CardMedia component="img" alt={name} image={urlImage} className="img" sx={{ }} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${price}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/detail/${id}`}>
          <Button size="small">+ Info</Button>
        </Link>
        <Button onClick={handleAgregarCarrito} size="small">
          Añadir al carrito
        </Button>
      </CardActions>
    </Card>
  );
};

export default Cards;
