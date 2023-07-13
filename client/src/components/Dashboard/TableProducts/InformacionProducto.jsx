import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { useSelector } from "react-redux";

const InformacionProducto = () => {
  const Formulario = useFormContext();
  const allCategorys = useSelector((state) => state.allCategorys);
  return (
    <>
      <Grid item xs={12} md={6} xl={4}>
        <Controller
          name="name"
          control={Formulario.control}
          render={({ field, fieldState }) => (
            <TextField
              label="Nombre"
              {...field}
              onChange={(event) => {
                field.onChange(event);
                Formulario.trigger(field.name);
              }}
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              fullWidth
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6} xl={4}>
        <Controller
          name="urlImage"
          control={Formulario.control}
          render={({ field, fieldState }) => (
            <input
              type="file"
              onChange={(event) => {
                const file = event.target.files[0];
                field.onChange(event);
                Formulario.setValue("imagen", file);
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6} xl={4}>
        <Controller
          name="description"
          control={Formulario.control}
          render={({ field, fieldState }) => (
            <TextField
              label="Descripcion"
              type="text"
              {...field}
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              fullWidth
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6} xl={4}>
        <Controller
          name="stock"
          control={Formulario.control}
          render={({ field, fieldState }) => (
            <TextField
              label="Stock"
              type="number"
              {...field}
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              fullWidth
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6} xl={4}>
        <Controller
          name="price"
          control={Formulario.control}
          render={({ field, fieldState }) => (
            <TextField
              label="Precio"
              type="number"
              {...field}
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              fullWidth
            />
          )}
        />
      </Grid>

      <Grid item xs={12} md={6} xl={4}>
        <Controller
          name="categoryId"
          control={Formulario.control}
          render={({ field, fieldState }) => (
            <>
              <InputLabel id="category">Categoria</InputLabel>
              <Select labelId="category" label="Category" fullWidth {...field}>
                {allCategorys.map((cat) => (
                  <MenuItem value={cat.id} key={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </>
          )}
        />
      </Grid>
      <Grid item xs={12} md={6} xl={4}>
        <Controller
          name="isactive"
          control={Formulario.control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Switch defaultChecked checked={field.value} {...field} />
              }
              label={`${field.value ? "Desactivar" : "Activar"} Producto`}
            />
          )}
        />
      </Grid>
    </>
  );
};

export default InformacionProducto;
