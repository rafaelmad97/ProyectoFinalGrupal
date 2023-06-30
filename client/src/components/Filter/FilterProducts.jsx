import { Container, Card, Grid, MenuItem, Select, InputLabel } from "@mui/material";
import { useSelector } from "react-redux";



const Filter = () => {
  const allCategorys = useSelector((state) => state.allCategorys);

  return (
    <Container >
      <Card>
        <Grid item xs={12} md={6} xl={4}>
          
            
                <InputLabel id="category">Categoria</InputLabel>
                <Select labelId="category" label="Category" fullWidth>
                  {allCategorys.map((cat) => (
                    <MenuItem value={cat.name} key={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
          
        </Grid>
      </Card>
    </Container>
  );
};

export default Filter ;