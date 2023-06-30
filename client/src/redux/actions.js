import axios from "axios";
import swal from "sweetalert";
import {
  ALL_PRODUCTS,
  ERROR,
  GET_PRODUCTS,
  ADD_PRODUCT,
  ALL_CATEGORY,
  ADD_USER,
  ALL_USER,
  SEARCH_PRODUCT,
} from "./types";

export const getAllProducts = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/products");
      const products = response.data;

      dispatch({
        type: ALL_PRODUCTS,
        payload: products,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};

export const getByName = (name) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/products?search=${name}`
      );
      const nameProduct = response.data;
      return nameProduct;
      // dispatch({
      //   type: SEARCH_PRODUCT,
      //   payload: nameProduct,
      // });
    } catch (error) {
      return new Error("no existen resultados");
      // dispatch({
      //   type: ERROR,
      //   payload: error,
      // });
    }
  };
};

export const getAllCategorys = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/categoria");
      const category = response.data;
      dispatch({
        type: ALL_CATEGORY,
        payload: category,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};

export const getAllUsers = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/users");
      const user = response.data;
      dispatch({
        type: ALL_USER,
        payload: user,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};

export const detailProducts = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/products/${id}`);
      const detailProduct = response.data;
      dispatch({
        type: GET_PRODUCTS,
        payload: detailProduct,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};

export function addProducts(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "http://localhost:3001/products",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const productId = response.data.id;
      const categorias = payload.category;
      const direccion = `http://localhost:3001/products/${productId}/category/${categorias}`;

      await axios.post(direccion, response.data);

      dispatch({
        type: ADD_PRODUCT,
        payload: response.data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

export function addUser(payload, email) {
  var url2 = `http://localhost:3001/users/${payload.email}`;

  return function (dispatch) {
    fetch(url2)
      .then((response) => response.json())
      .then((response) => {
        dispatch({
          type: ADD_USER,
          payload: response,
        });
        if (response === "ya existe un usuario con este email") {
          return swal({
            text: "Ya existe un usuario con este email",
            icon: "error",
            timer: "2000",
          });
        } else {
          var url = `http://localhost:3001/users`;
          fetch(url, {
            method: "POST", // or 'PUT'
            body: JSON.stringify(payload),
            // data can be string or {object}!
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((json) => {
              dispatch({
                type: ADD_USER,
                payload: json,
              });
            });
          return swal({
            text: "Se ha creado el usuario exitosamente, ahora haga click en el boton iniciar sesion para disfrutar de HenrySport",
            icon: "success",
            timer: "2000",
          });
        }
      });
  };
}
