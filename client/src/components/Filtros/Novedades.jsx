import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { addCarrito } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Pagination, Box } from "@mui/material";
import FilterAndSort from "./FilterAndSort/FilterAndSort";

const Novedades = () => {
  const dispatch = useDispatch();
  const dateFilter = useSelector((state) => state.dateFilter);
  const [page, setPage] = useState(1);
  const [cardsPerPage] = useState(6);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const indexOfLastCard = page * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = dateFilter.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <img
          src="https://pbs.twimg.com/media/DTP8W1JXUAALxIC.jpg"
          alt=""
          style={{ width: "100%", maxHeight: "300px" }}
        />
      </Box>
      <FilterAndSort/>
      <Grid container direction="row" spacing={1}>
        {currentCards.map((cat) => {
          return (
            <Grid item xs={12} md={4} xl={4} key={cat.id}>
              <Card elevation={4} sx={{ maxWidth: 345, margin: "10px" }}>
                <CardMedia
                  component="img"
                  alt={cat.name}
                  image={cat.urlImage}
                  className="img"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {cat.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${cat.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to={`/detail/${cat.id}`}>
                    <Button size="small">+ Info</Button>
                  </Link>
                  <Button
                    onClick={() => dispatch(addCarrito(cat.id))}
                    size="small"
                  >
                    Añadir al carrito
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Pagination
          variant="outlined"
          color="secondary"
          count={Math.ceil(dateFilter.length / cardsPerPage)}
          page={page}
          onChange={handleChange}
          size="large"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "yellow", // Cambiar el color de los números
            },
            "& .MuiPaginationItem-icon": {
              color: "#f44336", // Cambiar el color de las flechas de "Next" y "Prev"
            },
          }}
        />
      </Box>
    </div>
  );
};

export default Novedades;
