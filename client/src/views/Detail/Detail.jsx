

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { detailProducts } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Container } from "@mui/system";
import styles from "./Detail.module.css"
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector((state) => state.productDetail);
  console.log("detail", product);
  useEffect(() => {
    dispatch(detailProducts(id));
  }, [dispatch, id]);

  return (
    <div>
    <Container className={styles.container}>
      <Card sx={{ maxWidth: 500 }}>
        <CardMedia
          component="img"
          alt={product.name}
          height="250"
          image={product.urlImage}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Descripcion: {product.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Precio: ${product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Stock:{product.stock}
          </Typography>
        </CardContent>
        <CardActions>
           {/* <IconButton>
               <FavoriteIcon />
            </IconButton> 
           <IconButton>
               <ShoppingCartIcon />
            </IconButton>  */}
        </CardActions>
      </Card>

    </Container>
    </div>
  );
}

export default Detail;
