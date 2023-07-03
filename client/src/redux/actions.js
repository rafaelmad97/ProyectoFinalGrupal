import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import {
  ALL_PRODUCTS,
  ERROR,
  GET_PRODUCTS,
  ADD_PRODUCT,
  ALL_CATEGORY,
  ADD_USER,
  ALL_USER,
  SEARCH_PRODUCT,
  ADD_CARRITO,
  CLEAN_CARRITO,
  DELETE_ONE_ITEM_CARRITO,
  DELETE_ALL_ITEMS_CARRITO,
  ORDER_BY_PRICE,

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
    } catch (error) {
      return new Error("no existen resultados");
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

  return async function (dispatch) {
    return await axios.get(url2).then(({ data }) => {
      console.log(data);
      if (data === "Ya existe un usuario con este email") {
        throw Error(data);
      } else {
        var url = `http://localhost:3001/users`;
        axios
          .post(url, payload, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(({ data }) => {
            dispatch({
              type: ADD_USER,
              payload: data,
            });
          })
          .catch((e) => new Error(e.message));
      }
    });
  };
}

export const addCarrito = (id) => {
  return {
    type: ADD_CARRITO,
    payload: id,
  };
};

export const deleteOneItemCarrito = (id) => {
  return {
    type: DELETE_ONE_ITEM_CARRITO,
    payload: id
  }
}

export const deleteAllItemCarrito = (id) => {
  return {
    type: DELETE_ALL_ITEMS_CARRITO,
    payload: id
  }
}

export const cleanCarrito = ()=> {
  return {
    type:CLEAN_CARRITO
  }
}

export const orderByPrice = (price) => {
  return async function(dispatch){
      try {
          const response = await axios.get(`http://localhost:3001/filters/products?sortBy=${price}`);
          const byPrice = response.data;
          dispatch({
              type: ORDER_BY_PRICE,
              payload: byPrice
          })
      } catch (error) {
          dispatch({
              type: ERROR,
              payload: error
          })
      }
  }
}
