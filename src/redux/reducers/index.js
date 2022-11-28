import { combineReducers } from 'redux';
import { cartReducer } from './cartReducer';
import { productReducer } from './productReducer';
import { authReducer } from './authReducer';

export const reducers = combineReducers({
    allProducts: productReducer,
    totalCarts: cartReducer,
    user: authReducer,
})