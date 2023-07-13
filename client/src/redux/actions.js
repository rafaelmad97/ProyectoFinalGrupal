import axios, { AxiosError } from "axios";
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
  VIEW_REVIEW,
  CLEAN_FILTER_CATEGORY,
  CLEAN_DETAIL,

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

export const cleanDetail = () => {
  return {
    type: CLEAN_DETAIL
  }
}

export function addProducts(payload) {
  return async function (dispatch) {
    const newFormData = new FormData()
    newFormData.append("image", payload.imagen)
    newFormData.append("name", payload.name)
    newFormData.append("price", payload.price)
    newFormData.append("stock", payload.stock)
    newFormData.append("isactive", payload.isactive)
    newFormData.append("categoryId", payload.categoryId)
    newFormData.append("description", payload.description)
    try {
      const response = await axios.post(
        "http://localhost:3001/products",
        newFormData
      );

      dispatch({
        type: ADD_PRODUCT,
        payload: response.data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

export function editProducts(payload) {
  return async function (dispatch) {
    const newFormData = new FormData()
    newFormData.append("image", payload.imagen)
    newFormData.append("name", payload.name)
    newFormData.append("price", payload.price)
    newFormData.append("stock", payload.stock)
    newFormData.append("isactive", payload.isactive)
    newFormData.append("categoryId", payload.categoryId)
    newFormData.append("description", payload.description)
    try {
      const response = await axios.put(
        `http://localhost:3001/products/${payload.id}`,
        newFormData
      );

    } catch (error) {
      throw new Error(error.message);
    }
  };
}

/////////////////////////////////////////////////
// Modificar Usuario
export function editUser(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.put(
        `http://localhost:3001/users/${payload.id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

    } catch (error) {
      throw new Error(error.message);
    }
  };
}

/////////////////////////////////////////////////

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
        throw new Error(e.message);
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


//////////////////////////////localstorage
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
///////////////////////////////////


export const orderByPrice = (price) => {
  return {
    type: ORDER_BY_PRICE,
    payload: price
  }
}

export const filterByCategory = (categorys) => {
  return async function (dispatch) {
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

export const cleanFilterCategory = () => {
  return {
    type: CLEAN_FILTER_CATEGORY
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

    } catch (error) {

    }
  };
};

export const incrementProductQuantity = (userid, productid, quantity) => {
  return async (dispatch) => {
    try {
      await axios.put('http://localhost:3001/cart/updateitem', { userid, productid, quantity });


    } catch (error) {

    }
  };
};

export const removeFromCart = (userid, productid,) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`/api/removeProductInCart/${productid}/${userid}`, {
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
<<<<<<< HEAD
  };
};
=======
  }
}
export const removeFromCart = (userid) => {
  return async (dispatch) => {
    try {
      await axios.post("http://localhost:3001/cart/removeAllProduct", {userid})
    } catch (error) {
      
    }
  }
}


export const getCartUser = (userid) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/cart/user/${userid}`);
      return response.data

    } catch (error) {
      
    }
  }
}

export function deleteProducts(payload) {
  var id = payload;
  var url = `http://localhost:3001/products/delete/${id}`

  const borrar = axios({
      method: 'delete',
      url: url,
      headers: {
          'Content-Type': 'application/json'
      }
  })
}
>>>>>>> 38dba5fbfc937becbd547eb4ecc47660bfad3dff
