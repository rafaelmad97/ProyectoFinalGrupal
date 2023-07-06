import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { addCarrito, detailProducts } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "@mui/system";
import styles from "./Detail.module.css";
import { IconButton, Rating } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector((state) => state.productDetail);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);

  console.log("detail", product);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await getReviews(id);
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [id]);

  useEffect(() => {
    dispatch(detailProducts(id));
  }, [dispatch, id]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

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
            <IconButton>
              <FavoriteIcon />
            </IconButton>
            <IconButton>
              <ShoppingCartIcon onClick={()=>dispatch(addCarrito(product.id))} />
            </IconButton>
          </CardActions>
          <Container className={styles.container}>
            <Rating
              name="rating"
              value={rating}
              onChange={(event, newRating) => handleRatingChange(newRating)}
            />
            <Card sx={{ maxWidth: 500 }}>
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
                <h3 style={{ color: "#000000" }}>
                  No hay opiniones disponibles
                </h3>
              )}
            </Card>
          </Container>
        </Card>
      </Container>
    </div>
  );
}

export default Detail;
