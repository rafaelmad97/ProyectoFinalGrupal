import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { addCarrito, addProductToCart, getAllUsers } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";


import "./Card.css";
import { useEffect } from "react";

const Cards = (props) => {

  const { allUser, userAuthenticated } = useSelector(state => state)
  const { name, urlImage, price, id } = props;
  const dispatch = useDispatch()


  const handleAddToCart = (userId, productId, quantity) => {
    //const userId = allUser.length > 0 ? allUser[0].id : null; // Obtén el userId del primer usuario
    dispatch(addProductToCart(userId, productId, quantity));
  };

  //console.log(userAuthenticated.user.profile);

  return (
    <Card elevation={4} sx={{ maxWidth: 345 }}>
      <CardMedia component="img" alt={name} image={urlImage} className="img" />
      <CardContent>
        <Typography gutterBottom variant="h7" component="div">
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
        <div className="nav-item">
              {userAuthenticated === undefined ? (
               <Button onClick={()=>handleAddToCart(id, 2)} size="small">Añadir al carrito Invitado</Button>
              ) : (
                <>
                  {userAuthenticated.user.profile?.provider === "google" ? (
                    <Button onClick={()=>handleAddToCart(userAuthenticated.user.profile.id, id, 2)} size="small">Añadir al carrito UserGoogle</Button>
                  ) : (
                    <>
                      <Button onClick={()=>handleAddToCart(userAuthenticated.user.id, id, 1)} size="small">Añadir al carrito UserBd</Button>
                    </>
                  )}
                </>
              )}
            </div>
      </CardActions>
    </Card>
  );
};

export default Cards;
