import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../store/slice/userSlice';
import pizzaReducer from '../store/slice/pizzaSlice';
import cartReducer from '../store/slice/cartSlice';
import authReducer from '../store/slice/authSlice';
import uiReducer from '../store/slice/uiSlice';
export const store = configureStore({
    reducer:{
        user:userReducer,
        pizzaOrder:pizzaReducer,
        cart:cartReducer,
        auth:authReducer,
        ui:uiReducer
    }
});