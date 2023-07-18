import {Grid, Switch, FormControlLabel } from "@mui/material"
import { useFormContext, Controller } from "react-hook-form";



const InfoUser = () => {
    const Formulario = useFormContext();
    return <>
                <Grid item xs={12} md={6} xl={4}>
                <Controller
                  name="isactive"
                  control={Formulario.control}
                  render={({ field }) => (
                    <FormControlLabel control={<Switch defaultChecked checked={field.value} {...field}/>} label={`${field.value ? "User Desabilitdo":"User Activo"}`}/>
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6} xl={4}>
                <Controller
                  name="isadmin"
                  control={Formulario.control}
                  render={({ field }) => (
                    <FormControlLabel control={<Switch defaultChecked checked={field.value} {...field}/>} label={`${field.value ? "No Admin":"Admin"}`}/>
                  )}
                />
              </Grid>




    </>
}

export default InfoUser;