import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { Box, Grid, Pagination, Select, MenuItem } from "@mui/material";
import {
  addCarrito,
  cleanFilterCategory,
  filterByCategory,
  orderByDate,
  orderByPrice,
} from "../../redux/actions";
import FilterAndSort from "./FilterAndSort/FilterAndSort";

const Filtros = () => {
  const dispatch = useDispatch();
  const { categoryFilter } = useSelector((state) => state);
  const [page, setPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(6);
  const [combinedFilter, setCombinedFilter] = useState({
    price: "",
    date: "",
  });

  useEffect(() => {
    return () => {
      dispatch(cleanFilterCategory());
    };
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleOrderPrice = (event) => {
    const price = event.target.value;
    const newFilter = { ...combinedFilter, price };
    setCombinedFilter(newFilter);
    dispatch(orderByPrice(newFilter));
  };

  const handleOrderDate = (event) => {
    const date = event.target.value;
    const newFilter = { ...combinedFilter, date };
    setCombinedFilter(newFilter);
    dispatch(orderByDate(newFilter));
  };

  const indexOfLastCard = page * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = categoryFilter.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <div>
       <FilterAndSort/>
      {categoryFilter.length > 0 ? (
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1, color: "black", padding: "10px" }}
          className="title"
        >
          {categoryFilter[0]?.category.name}
        </Typography>
      ) : (
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: "black" }}
          className="title"
        >
          No hay productos en esta categoría
        </Typography>
      )}

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
        <label
          htmlFor="select-order-price"
          style={{ marginRight: "5px", color: "black" }}
        >
          <h3>Ordenar por precio:</h3>
        </label>
        <Select
          id="select-order-price"
          value={combinedFilter.price}
          onChange={handleOrderPrice}
          style={{ marginRight: "10px" }}
        >
          <MenuItem value="">Seleccionar</MenuItem>
          <MenuItem value="asc">Ascendente</MenuItem>
          <MenuItem value="desc">Descendente</MenuItem>
        </Select>

        <label
          htmlFor="select-order-date"
          style={{ marginRight: "5px", color: "black" }}
        >
          <h3>Ordenar por fecha:</h3>
        </label>
        <Select
          id="select-order-date"
          value={combinedFilter.date}
          onChange={handleOrderDate}
          style={{ marginRight: "30px" }}
        >
          <MenuItem value="">Seleccionar</MenuItem>
          <MenuItem value="asc">Ascendente</MenuItem>
          <MenuItem value="desc">Descendente</MenuItem>
        </Select>

      </Box>

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
