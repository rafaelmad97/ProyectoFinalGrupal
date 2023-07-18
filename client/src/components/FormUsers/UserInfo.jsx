import {Grid, TextField } from "@mui/material"
import { useFormContext, Controller } from "react-hook-form";

const UserInfo = () => {
    const Formulario = useFormContext()
    return <>
                <Grid item xs={12} md={6} xl={4}>
              <Controller
                name="name"
                control={Formulario.control}
                render={({ field, fieldState }) => (
                  <TextField
                    label="Nombres"
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
                name="lastName"
                control={Formulario.control}
                render={({ field, fieldState }) => (
                  <TextField
                    label="Apellidos"
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
                name="email"
                control={Formulario.control}
                render={({ field, fieldState }) => (
                  <TextField
                    label="Correo electronico"
                    type="email"
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
                name="password"
                control={Formulario.control}
                render={({ field, fieldState }) => (
                  <TextField
                    label="Contraseña"
                    type="password"
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
                name="phone"
                control={Formulario.control}
                render={({ field, fieldState }) => (
                  <TextField
                    label="Telefono"
                    
                    {...field}
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                    fullWidth
                  />
                )}
              />
            </Grid>
    </>
} 

export default UserInfo;