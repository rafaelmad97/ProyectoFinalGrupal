import { ADD_PRODUCT, ADD_USER, ALL_CATEGORY, ALL_PRODUCTS, ALL_USER, GET_PRODUCTS } from "./types"

const initialState = {
    allProducts: [],
    productDetail: {},
    allCategorys: [],
    allUser: []
    
}

const reducer = (state = initialState, actions) => {
    switch(actions.type){

        case ALL_PRODUCTS:
            return {
                ...state,
                allProducts: actions.payload
            }

        case ADD_PRODUCT:
            return {
                ...state,
                allProducts: [...state.allProducts, actions.payload],
            }

        case ALL_USER:
            return {
                ...state,
                allUser: actions.payload
            }

        case ADD_USER:
            return {
                ...state,
                allUser: [...state.allUser, actions.payload]
            }

        case ALL_CATEGORY:
            return {
                ...state,
                allCategorys: actions.payload
            }

        case GET_PRODUCTS:
            return {
                ...state,
                productDetail:actions.payload
            }
            
        default:
            return {
                ...state
            }
    }
}

export default reducer