import { ActionTypes } from "../constants/action-types"

const initialState = {
    users: null,
}

export const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_AUTH:
            return { ...state, users: payload }
        case ActionTypes.REMOVE_AUTH:
            return { ...state, users: null }
        default:
            return state
    }
}