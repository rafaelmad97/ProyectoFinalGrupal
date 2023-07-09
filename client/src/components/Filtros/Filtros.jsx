
// import React from 'react'
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  addCarrito,
  filterByCategory,
  orderByDate,
  orderByPrice,
} from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Grid, Pagination } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import FilterAndSort from "./FilterAndSort/FilterAndSort";

const Filtros = () => {
  const dispatch = useDispatch();
  const { categoryFilter } = useSelector((state) => state);
  const [page, setPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(6);
  const [orderPrice, setOrderPrice] = useState("");
  const [orderDate, setOrderDate] = useState("");

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleOrderPrice = (event) => {
    dispatch(orderByPrice(event.target.value));
    setOrderPrice(event.target.value);
  };

  const handleOrderDate = (event) => {
    dispatch(orderByDate(event.target.value));
    setOrderDate(event.target.value);
  };

  const indexOfLastCard = page * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = categoryFilter.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <div>
      {categoryFilter.length > 0 ? (
        <Typography
          variant="h2"
          component="div"
          sx={{ flexGrow: 1 }}
          className="title"
        >
          {categoryFilter[0]?.category.name}
        </Typography>
      ): <Typography
      variant="h2"
      component="div"
      sx={{ flexGrow: 1 }}
      className="title"
    >
      f en el chat
    </Typography> }
     <Box
  sx={{
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "20px",
    marginLeft: "auto",
    flexGrow: 1,
  }}
>
  <label htmlFor="select-order" style={{ marginRight: "5px", color: "black" }}>
    <h3>Ordenar por fecha:</h3>
  </label>
  <select
    id="select-order"
    value={orderDate}
    onChange={(event) => handleOrderDate(event)}
    style={{ marginRight: "30px" }}
  >
    <option value="">Seleccionar</option>
    <option value="asc">Ascendente</option>
    <option value="desc">Descendente</option>
  </select>

  <label htmlFor="select-order" style={{ marginRight: "5px", color: "black"}}>
    <h3>Ordenar por precio:</h3>
  </label>
  <select
    id="select-order"
    value={orderPrice}
    onChange={(event) => handleOrderPrice(event)}
    style={{ marginRight: "10px" }}
  >
    <option value="">Seleccionar</option>
    <option value="asc">Ascendente</option>
    <option value="desc">Descendente</option>
  </select>
</Box>

      <Grid container direction="row" spacing={1}>
        {categoryFilter?.map((cat) => {
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
          count={Math.ceil(categoryFilter.length / cardsPerPage)}
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

export default Filtros;