import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name:'auth',
    initialState:{
        isLoggedIn:localStorage.getItem("CurrentUser") ? true :false,
        user:localStorage.getItem("CurrentUser") ? JSON.parse(localStorage.getItem("CurrentUser")) : null,
        userDb:localStorage.getItem("UserData") ? JSON.parse(localStorage.getItem("UserData")) : [],
        error:null
    },
    reducers:{
        login:(state, action)=>{
            const {loginData} = action.payload
            const userData = localStorage.getItem('UserData')
            const userList = userData ? JSON.parse(userData): [];
            const validUser = userList.find((user) => user.email === loginData.email && user.password === loginData.password)
            if(validUser){
                state.isLoggedIn = true;
                state.user = validUser;
                state.error = null;
                localStorage.setItem('CurrentUser', JSON.stringify(validUser));
            } else{
                state.error = 'Invalid Email or Password'
            }

        },
        logout:(state)=>{
            state.isLoggedIn = false;
            state.user = null;
            state.error = null;
            localStorage.removeItem("CurrentUser")
        },
        signup:(state, action)=>{
            const {signupData} = action.payload;
            const userData = localStorage.getItem('UserData');
            const currentUsers = userData ? JSON.parse(userData) : [];
            const isUserExist = currentUsers.find(user=>user.email === signupData.email);
            if(isUserExist){
                state.error = 'This Email is already registered!'
                return;
            }
            currentUsers.push(signupData);
            localStorage.setItem('UserData',JSON.stringify(currentUsers));
            state.userDb = currentUsers;
            state.error = null;
        },
    }
})

export const {login, logout, signup} = authSlice.actions
export default authSlice.reducer

