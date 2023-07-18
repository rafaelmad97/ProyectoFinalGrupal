import { Grid } from "@mui/material";
import Cards from "../Card/Card";

export const CardsContainer = ({ allProducts }) => {
  return (
    <div>
      <Grid container direction="row" spacing={1}>
        {allProducts.filter((prod)=> prod.stock > 0 ).filter((prod)=>Boolean(prod.isactive)).map((prod) => {
         
          return (
            <Grid item xs={12} md={4} xl={4} key={prod.id}>
              <Cards
                id={prod.id}
                name={prod.name}
                description={prod.description}
                urlImage={prod.urlImage}
                price={prod.price}
                stock={prod.stock}
              />
            </Grid>);
        })}
      
      </Grid>
    </div>
  );
};
