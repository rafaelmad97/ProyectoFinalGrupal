import {
  ADD_CARRITO,
  ADD_PRODUCT,
  ADD_USER,
  ALL_CATEGORY,
  ALL_PRODUCTS,
  ALL_USER,
  GET_PRODUCTS,
  SEARCH_PRODUCT,
  CLEAN_CARRITO,
  DELETE_ALL_ITEMS_CARRITO,
  DELETE_ONE_ITEM_CARRITO,
  LOGIN_GOOGLE,
  LOGIN_LOCAL,
  LOGOUT,
  ORDER_BY_PRICE,
  FILTER_BY_CATEGORY,
  FILTER_BY_DATE,
} from "./types";

const initialState = {
  allProducts: [],
  copyAllProducts: [],
  productDetail: {},
  allCategorys: [],
  allUser: [],
  myCarrito: [],
  userAuthenticated: undefined,
  categoryFilter: [],
  copyCategoryFilter: [],
  dateFilter: [],
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case ALL_PRODUCTS:
      return {
        ...state,
        allProducts: actions.payload,
        copyAllProducts: actions.payload,
      };

    case ADD_PRODUCT:
      return {
        ...state,
        allProducts: [...state.allProducts, actions.payload],
      };

    case ALL_USER:
      return {
        ...state,
        allUser: actions.payload,
      };

    case ADD_USER:
      return {
        ...state,
        allUser: [...state.allUser, actions.payload],
      };

    case ALL_CATEGORY:
      return {
        ...state,
        allCategorys: actions.payload,
      };

    case GET_PRODUCTS:
      return {
        ...state,
        productDetail: actions.payload,
      };

    case SEARCH_PRODUCT:
      return {
        ...state,
        allProducts: actions.payload,
      };

    case ADD_CARRITO:
      const newCar = state.allProducts.find(
        (prod) => prod.id === actions.payload
      );

      const itemsInCar = state.myCarrito.find((item) => item.id === newCar.id);
      return itemsInCar
        ? {
            ...state,
            myCarrito: state.myCarrito.map((item) =>
              item.id === newCar.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          }
        : {
            ...state,
            myCarrito: [...state.myCarrito, { ...newCar, quantity: 1 }],
          };

    case DELETE_ONE_ITEM_CARRITO:
      const deleteOneItem = state.myCarrito.find(
        (item) => item.id === actions.payload
      );

      return deleteOneItem.quantity > 1
        ? {
            ...state,
            myCarrito: state.myCarrito.map((item) =>
              item.id === actions.payload
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          }
        : {
            ...state,
            myCarrito: state.myCarrito.filter(
              (item) => item.id !== actions.payload
            ),
          };

    case DELETE_ALL_ITEMS_CARRITO:
      return {
        ...state,
        myCarrito: state.myCarrito.filter(
          (item) => item.id !== actions.payload
        ),
      };

    case CLEAN_CARRITO:
      return {
        ...state,
        myCarrito: [],
      };

    case LOGIN_GOOGLE:
      return {
        ...state,
        userAuthenticated: {
          user: actions.payload.user,
        },
      };

    case LOGIN_LOCAL:
      return {
        ...state,
        userAuthenticated: {
          user: actions.payload.user,
        },
      };

    case LOGOUT:
      return {
        ...state,
        userAuthenticated: undefined,
      };

    case FILTER_BY_CATEGORY:
        return {
          ...state,
          categoryFilter: actions.payload,
          copyCategoryFilter: actions.payload
        }

    case ORDER_BY_PRICE:
        const orderByPrice = state.copyCategoryFilter.sort((a,b) => {
          if (a.price > b.price) {
              return actions.payload === "asc" ? 1 : -1
          }
          if (a.price < b.price) {
              return actions.payload === "desc" ? 1 : -1
          }
          return 0
      })
      return {
          ...state,
          categoryFilter: orderByPrice
      }

      case FILTER_BY_DATE:
        return {
          ...state,
          dateFilter: actions.payload
        }
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
