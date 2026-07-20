import { createSlice } from "@reduxjs/toolkit";


const uiSlice = createSlice({
    name:'ui',
    initialState:{
        isOpen:false,
    },
    reducers:{
        openModel:(state)=>{
            state.isOpen = true;
        },
        closeModel:(state)=>{
            state.isOpen = false;
        }
    }
})

export const {openModel, closeModel} = uiSlice.actions
export default uiSlice.reducer