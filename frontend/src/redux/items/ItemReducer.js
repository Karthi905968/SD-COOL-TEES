import { createSlice } from "@reduxjs/toolkit";


const initialState = {
}
    

export const ItemReducer = createSlice({
    name:'items',
    initialState,
    reducers:{
        listItems:(state,action)=>{
            state = action.payload
            return state
        }
    }
})

export const{listItems}=ItemReducer.actions
export default ItemReducer.reducer
