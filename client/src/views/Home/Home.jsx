import { useEffect } from "react";
import { CardsContainer } from "../../components/Cards/CardsContainer";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions";
import styles from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  console.log(allProducts);
  return (
    <div>
      <CardsContainer allProducts={allProducts} />
    </div>
  );
};

export default Home;
