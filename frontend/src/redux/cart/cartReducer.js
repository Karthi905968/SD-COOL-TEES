import {createSlice } from "@reduxjs/toolkit";
const initialState={
    cart:[],
    subTotal:0
}

export const cartReducer= createSlice({
    name:'cart',
    initialState,
    reducers:{
        addcart:(state,action)=>{
           const data=action.payload
           return{
            ...state,cart:data
           }
        },
        addSubTotal:(state,action)=>{
            const total = action.payload
            state.subTotal=total
            console.log('redux',total);
        }
    }
})

export const {addcart,addSubTotal}=cartReducer.actions
export default cartReducer.reducer