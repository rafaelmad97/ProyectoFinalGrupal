import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { addCarrito } from "../../redux/actions";
import { useDispatch } from "react-redux";


import "./Card.css";

const Cards = (props) => {
  const { name, urlImage, price, id } = props;
  const dispatch = useDispatch()


  return (
    <Card elevation={4} sx={{ maxWidth: 345 }}>
      <CardMedia component="img" alt={name} image={urlImage} className="img" />
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
        <Button onClick={()=>dispatch(addCarrito(id))} size="small">Añadir al carrito</Button>
      </CardActions>
    </Card>
  );
};

export default Cards;
