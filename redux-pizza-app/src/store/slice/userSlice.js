import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    signupForm:{
        name:'',
        email:'',
        phone:'',
        password:'',
        confirmPassword:'',
        gender:'',
        termsAndCond:false
    },
    loginForm: {
        email: '',
        password: ''
    },
    errors:{},
    isSubmitting:false
};
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        updateField:(state, action)=>{
            const {formType,fieldName, fieldValue} = action.payload;
            state[formType][fieldName] = fieldValue
        },
        setErrors:(state, action)=>{
            state.errors = action.payload
        },
        clearErrors:(state)=>{
            state.errors = {}
        }
        
    }
})
export const { updateField, setErrors, clearErrors} = userSlice.actions
export default userSlice.reducer