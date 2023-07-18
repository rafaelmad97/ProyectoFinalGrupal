import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { addCarrito, addReview, cleanDetail, detailProducts, getReviews } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "@mui/system";
import styles from "./Detail.module.css";
import { IconButton, Rating, Grid, TextField, Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { yupResolver } from "@hookform/resolvers/yup";
import { string, object, number} from "yup";
import { Controller, useForm } from "react-hook-form";

export const shemmaReviews = object({
  start: number().required("Este campo es requerido"),
  descrition: string().required("Este campo es requerido"),
});

function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector((state) => state.productDetail);
  const review = useSelector((state) => state.review);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);

  console.log("detail", product);

  const Formulario_Reviews = useForm({
    defaultValues: {
      start: 0,
      description: "",
    },
    resolver: yupResolver(shemmaReviews),
  });
  
  const fetchReviews = () => {
    try {
      dispatch(getReviews(id));
      setReviews(review);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
  useEffect(() => {
    
    fetchReviews();
  }, []);

  useEffect(() => {
    dispatch(detailProducts(id));
    return (()=>{
      dispatch(cleanDetail())
    })
  }, [dispatch, id]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };


  const onSubmitReview = (data) => {
    const { rating, description } = data;
    const newReview = {
      rating,
      description,
    };
    dispatch(addReview(id, newReview));
    Formulario_Reviews.reset(); // Reinicia el formulario después de enviar la reseña
    setRating(0);
  };
  

  return (
    <div>
  <Container className={styles.container}>
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <div style={{ flexGrow: 1, padding: "16px" }}>
            <Typography gutterBottom variant="h6" component="div">
              {product.name}
            </Typography>
          </div>
          <CardMedia
            component="img"
            alt={product.name}
            height="100%"
            image={product.urlImage}
          />
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <CardContent>
            <Typography variant="h5" color="text.secondary">
              Precio: ${product.price}
            </Typography>
            <Typography variant="h5" color="text.secondary">
              Stock: {product.stock} unidades
            </Typography> 
            <CardActions>
             
              <IconButton onClick={() => dispatch(addCarrito(product.id))}>
                <ShoppingCartIcon
                  style={{ fontSize: "3rem" }}
                  
                />
              </IconButton>
            </CardActions>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Container>
  <Container className={styles.container}>
        <Typography gutterBottom variant="h6" component="div">
          Opiniones del producto
        </Typography>
        <form onSubmit={Formulario_Reviews.handleSubmit(onSubmitReview)}>
          <Controller
            name="rating"
            control={Formulario_Reviews.control}
            render={({ field }) => (
              <Rating
                name="rating"
                value={field.value}
                onChange={(event, newRating) => handleRatingChange(newRating)}
              />
            )}
          />
          <Controller
            name="description"
            control={Formulario_Reviews.control}
            render={({ field, fieldState }) => (
              <TextField
                label="Descripción"
                type="text"
                {...field}
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
                fullWidth
              />
            )}
          />
          <Button type= "submit" sx={{backgroundColor: "#222222", color:"#ffffff"}} >Enviar Reseña</Button>
        </form>
      </Container>

  <Container className={styles.container}>
     
    <Card sx={{ height: "100%", marginTop: "16px" }}>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div
          className="bg-gray-100 drop-shadow-lg rounded p-6 mt-4"
          key={review.id}
          >
            <div>
              <div className="rating">
                {Array.from({ length: Math.min(review.rating, 5) }).map(
                  (_, index) => (
                    <FontAwesomeIcon
                    icon={faStar}
                    key={index}
                    style={{ color: "#FFD700" }}
                    />
                    )
                    )}
              </div>
              <h3 style={{ color: "#000000" }}>{review.description}</h3>
              {/* <p>{review.user.name}</p> */}
            </div>
          </div>
        ))
      ) : (
        <h3 style={{ color: "#000000" }}>No hay opiniones disponibles</h3>
      )}
    </Card>
  </Container>
</div>

  );
}

export default Detail;