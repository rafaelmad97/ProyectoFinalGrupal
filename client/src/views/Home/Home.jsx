import { useEffect, useState } from "react";
import { CardsContainer } from "../../components/Cards/CardsContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  fetchUserSessionGoogle,
  fetchUserSessionLocally,
  getAllCategorys,
} from "../../redux/actions";
import { Pagination } from "@mui/material";
import { Box } from "@mui/system";
import Banner from "../../components/Banner/Banner";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { allProducts, allCategorys } = useSelector((state) => state);

  const [page, setPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(6);

  useEffect(() => {
    dispatch(fetchUserSessionGoogle());
    dispatch(fetchUserSessionLocally());
    dispatch(getAllProducts());
    dispatch(getAllCategorys());
  }, [dispatch]);

  console.log("categorias", allCategorys);

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
    </div>
  );
};

export default Home;
