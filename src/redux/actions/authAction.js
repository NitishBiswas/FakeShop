import { ActionTypes } from "../constants/action-types"

export const setAuth = (user) => {
    return {
        type: ActionTypes.SET_AUTH,
        payload: user
    }
}

export const removeAuth = () => {
    return {
        type: ActionTypes.REMOVE_AUTH,
    }
}