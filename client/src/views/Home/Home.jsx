import { useEffect, useState } from "react";
import { CardsContainer } from "../../components/Cards/CardsContainer";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, fetchUserSession } from "../../redux/actions";
import { Pagination } from "@mui/material";
import { Box, margin } from "@mui/system";
import Filter from "../../components/Filter/FilterProducts";
import Banner from "../../components/Banner/Banner";

const Home = () => {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state);

  const [page, setPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(6);

  useEffect(() => {
    dispatch(fetchUserSession());
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const indexOfLastCard = page * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = allProducts.slice(indexOfFirstCard, indexOfLastCard);

  console.log(allProducts);
  return (
    <div>
      <Banner />
      <CardsContainer allProducts={currentCards} />
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
          count={Math.ceil(allProducts.length / cardsPerPage)}
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
      <CardsContainer allProducts={currentCards} />
    </div>
  );
};

export default Home;
