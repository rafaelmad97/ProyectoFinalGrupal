import axios, { AxiosError } from "axios";
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
  LOGIN_GOOGLE,
  LOGIN_LOCAL,
  LOGOUT,
  ORDER_BY_PRICE,
  FILTER_BY_CATEGORY,
  FILTER_BY_DATE,
  ORDER_BY_DATE,
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

export const loginLocallyUser = (email, password) => {
  return async function () {
    return await axios
      .post(
        "http://localhost:3001/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:3001/",
          },
        }
      )
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      })
      .finally();
  };
};

export const fetchUserSessionGoogle = () => {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:3001/authenticated", {
        withCredentials: true,
      })

      .then((res) =>
        dispatch({
          type: LOGIN_GOOGLE,
          payload: res.data,
        })
      )
      .finally();
  };
};

export const fetchUserSessionLocally = () => {
  return async function (dispatch) {
    await axios
      .get("http://localhost:3001/login/authenticated", {
        withCredentials: true,
      })
      .then((res) =>
        dispatch({
          type: LOGIN_LOCAL,
          payload: res.data,
        })
      );
  };
};
export const logoutUserSessionGoogle = () => {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:3001/logout", {
        withCredentials: true,
      })

      .then((res) =>
        dispatch({
          type: LOGOUT,
          payload: undefined,
        })
      );
  };
};

export const logoutUserSessionLocal = () => {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:3001/login/logout", {
        withCredentials: true,
      })
      .then((res) =>
        dispatch({
          type: LOGOUT,
          payload: undefined,
        })
      );
  };
};

export const addCarrito = (id) => {
  return {
    type: ADD_CARRITO,
    payload: id,
  };
};

export const deleteOneItemCarrito = (id) => {
  return {
    type: DELETE_ONE_ITEM_CARRITO,
    payload: id,
  };
};

export const deleteAllItemCarrito = (id) => {
  return {
    type: DELETE_ALL_ITEMS_CARRITO,
    payload: id,
  };
};

export const cleanCarrito = () => {
  return {
    type: CLEAN_CARRITO,
  };
};

export const orderByPrice = (price) => {
  return {
      type: ORDER_BY_PRICE,
      payload: price
  }
}

export const filterByCategory = (categorys) => {
  return async function(dispatch){
      try {
          const response = await axios.get(`http://localhost:3001/filters/products?category=${categorys}`);
          const category = response.data;
          dispatch({
              type: FILTER_BY_CATEGORY,
              payload: category
          })
      } catch (error) {
          dispatch({
              type: ERROR,
              payload: error
          })
      }
  }
}

export const filterByDate = () => {
  return {
    type: FILTER_BY_DATE
  };
};

export const orderByDate = (order) => {
  return {
    type: ORDER_BY_DATE,
    payload: order
  }
}

// action de reviews

export function getReviews(id) {
  return function (dispatch) {
    const url = `http://localhost:3001/reviews?productId=${id}`;
    console.log(id + " actions")
    return axios.get(url)
      .then(res => res.data)
      .then(data => {
        dispatch({ type: VIEW_REVIEW, payload: data })
      })
  }
}

export function addReview(reviewData) {
  return function (dispatch) {
    const url = 'http://localhost:3001/reviews';
    return axios.post(url, reviewData)
      .then(data => {
        dispatch({ type: ADD_REVIEW, payload: data });
        swal({
          icon: "success",
          title: "Modificación",
          text: "Se modificó el producto correctamente",
        });
      })
      .catch((error) => {
        let errorMessage = "Ha ocurrido un error";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        swal({
          icon: "error",
          title: "Oops...",
          text: errorMessage,
        });
      });
  };
}

export const addProductToCart = (user, product, quantity) => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:3001/cart/add-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user, product, quantity }),
      });

      if (response.ok) {
        const addedProduct = await response.json()
        //dispatch({ type: 'ADD_PRODUCT_SUCCESS', payload: { user, product, quantity } });
        dispatch({ type: 'ADD_PRODUCT_SUCCESS', payload: { product: addedProduct } });
      } else {
        throw new Error('Failed to add product to cart');
      }
    } catch (error) {
      dispatch({ type: 'ADD_PRODUCT_FAILURE', payload: error.message });
    }
  };
};

export const incrementProductQuantity = (user, product) => {
  return async (dispatch) => {
    try {
      const response = await axios.put('http://localhost:3001/cart/addProductOne', { user, product });
      const { updated, msg } = response.data;

      if (updated) {
        // La cantidad del producto se incrementó correctamente
        dispatch({ type: 'INCREMENT_PRODUCT_QUANTITY_SUCCESS', payload: { product, msg } });
      } else {
        // Ocurrió un error al incrementar la cantidad del producto
        dispatch({ type: 'INCREMENT_PRODUCT_QUANTITY_FAILURE', payload: { error: msg } });
      }
    } catch (error) {
      // Ocurrió un error en la solicitud
      dispatch({ type: 'INCREMENT_PRODUCT_QUANTITY_FAILURE', payload: { error: error.message } });
    }
  };
};

export const removeFromCart = (idProduct, idUser) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`/api/removeProductInCart/${idProduct}/${idUser}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Producto eliminado del carrito:', data.msg);
        // Realizar acciones adicionales si es necesario
      } else {
        throw new Error('Error al eliminar el producto del carrito');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.message);
      // Realizar acciones adicionales si es necesario
    }
  };
};