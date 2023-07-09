

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  IconButton,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { getAllUsers } from "../../../redux/actions";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
//import Dashboard from "../../components/Dashboard.jsx";

function TableUsers() {
  const { allUser } = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(allUser);

  useEffect(()=>{
    dispatch(getAllUsers())
  },[])

  return (
    <Container fixed>
      <Card>
        <CardContent>
          <h2>Usuarios</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellidos</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell>Telefono</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell>Eliminar</TableCell>
                <TableCell>Habilitar/Desabilitar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUser?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.lastName}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>rol</TableCell>
                  <TableCell>
                    <div>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Container>
  );
}

export default TableUsers;