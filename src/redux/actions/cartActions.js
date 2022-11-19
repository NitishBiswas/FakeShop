import { ActionTypes } from "../constants/action-types"

export const addCart = (count) => {
    return {
        type: ActionTypes.ADD_CART,
        payload: count,
    }
}

export const removeCart = (count) => {
    return {
        type: ActionTypes.REMOVE_CART,
        payload: count,
    }
}

export const addTotalPrice = (total) => {
    return {
        type: ActionTypes.ADD_TOTAL_PRICE,
        payload: total,
    }
}

export const updateTotalPrice = (total) => {
    return {
        type: ActionTypes.UPDATE_TOTAL_PRICE,
        payload: total,
    }
}