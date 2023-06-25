import { ALL_PRODUCTS, GET_PRODUCTS } from "./types"

const initialState = {
    allProducts: [],
    productDetail: {},

}

const reducer = (state = initialState, actions) => {
    switch(actions.type){

        case ALL_PRODUCTS:
            return {
                ...state,
                allProducts: actions.payload
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