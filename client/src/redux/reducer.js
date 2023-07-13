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
  ORDER_BY_DATE,
  VIEW_REVIEW,
  ADD_REVIEW,
  CLEAN_FILTER_CATEGORY,
  CLEAN_DETAIL,
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
  review: [],
  cart: [],
  error: null
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

    case CLEAN_DETAIL:
      return {
        ...state,
        productDetail: {}
      }

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

    case "LOAD_CARRITO":
      const products = state.allProducts.filter(({id})=>Array(actions.payload).flat(Infinity).find((item)=>item.productId === id) !== undefined)
      console.log(Array(actions.payload));
      return {
        ...state,
        myCarrito: products.map((product)=>{
          const quantity = [...actions.payload].find(({productId})=>productId === product.id)?.Quantity;
          return {
            ...product,
            quantity: quantity
          }
        })
      }

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
          copyCategoryFilter: actions.payload,
        };

      case CLEAN_FILTER_CATEGORY:
        return {
          ...state,
          categoryFilter: [],
        }
  
      case ORDER_BY_PRICE:
        const orderByPrice = state.copyCategoryFilter.sort((a, b) => {
          if (a.price > b.price) {
            return actions.payload === "asc" ? 1 : -1;
          }
          if (a.price < b.price) {
            return actions.payload === "desc" ? 1 : -1;
          }
          return 0;
        });
        return {
          ...state,
          categoryFilter: orderByPrice,
        };
  
      case FILTER_BY_DATE:
        // Copia el arreglo de todos los productos
        const allProductsCopy = [...state.allProducts];
  
        // Ordena los productos por fecha de creación de forma descendente (de más reciente a más antiguo)
        const sortedProducts = allProductsCopy.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        });
  
        return {
          ...state,
          dateFilter: sortedProducts,
        };
  
      case ORDER_BY_DATE:
        // Clona el estado actual y ordena los productos por fecha de creación
        const orderDate = state.copyCategoryFilter.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateA - dateB; // Orden ascendente (de más antiguo a más reciente)
        });
  
        // Si el orden es descendente, invierte el arreglo
        if (actions.payload === "desc") {
          orderDate.reverse();
        }
  
        // Retorna el nuevo estado con los productos ordenados
        return {
          ...state,
          categoryFilter: orderDate,
        };
  
      //REDUCER DE REVIEWS
      case VIEW_REVIEW:
        return {
          ...state,
          review: actions.payload,
        };
  
      case ADD_REVIEW: {
        return {
          ...state,
          review: [...state.review, actions.payload],
          //review: state.review.filter((item) => item.id !== actions.payload),
        };
      }
  
      case 'ADD_PRODUCT_SUCCESS':
        // Agregar el producto al carrito en el estado
        return {
          ...state,
          cart: [
            ...state.cart,
            {
              user: actions.payload.user,
              product: actions.payload.product,
              quantity: actions.payload.quantity,
            },
          ],
          error: null,
        };
      case 'ADD_PRODUCT_FAILURE':
        // Manejar el error al agregar el producto al carrito
        return {
          ...state,
          error: actions.payload,
        };
  
        case 'INCREMENT_PRODUCT_QUANTITY_SUCCESS':
          return {
            ...state,
            error: null,
          };
        case 'INCREMENT_PRODUCT_QUANTITY_FAILURE':
          return {
            ...state,
            error: actions.payload.error,
          };
  

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
