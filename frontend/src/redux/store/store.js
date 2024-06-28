import {configureStore } from '@reduxjs/toolkit'
import ItemReducer from '../items/ItemReducer'
import cartReducer from '../cart/cartReducer'
export const store = configureStore({
    reducer:{
        items:ItemReducer,
        carts:cartReducer
    }
})