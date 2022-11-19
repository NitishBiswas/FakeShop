import { ActionTypes } from "../constants/action-types"

const initialState = {
    count: 0,
    totalPrice: 0,
}

export const cartReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.ADD_CART:
            return { ...state, count: state.count + payload }
        case ActionTypes.REMOVE_CART:
            return state.count !== 0 ? { ...state, count: state.count - payload } : { ...state, count: 0 }
        case ActionTypes.ADD_TOTAL_PRICE:
            return { ...state, totalPrice: payload }
        case ActionTypes.UPDATE_TOTAL_PRICE:
            return { ...state, totalPrice: state.totalPrice + payload }
        default:
            return state
    }
}