import { createSlice } from "@reduxjs/toolkit";

const calculateTotalPrice = (state) =>{
    const sizePrice = state.prices.sizePrice[state.pizza.size]
    const crustPrice = state.prices.crustPrice[state.pizza.crust]
    const toppingPrice = state.pizza.toppings.reduce((sum, toppingName)=> sum + state.prices.toppingPrices[toppingName], 0)
    const sidePrice = state.pizza.sides.reduce((sum, sideName)=> sum + state.prices.sidePrices[sideName], 0)
    return sizePrice + crustPrice + toppingPrice + sidePrice
}

const pizzaSlice = createSlice({
    name:'pizza',
    initialState:{
        pizza:{
            size:'medium',
            crust:'classic',
            toppings:[],
            sides:[]
        },
        prices:{
            sizePrice:{ small:100, medium:150, large:200},
            crustPrice:{ classic:0, thin:20, thick:60, cheese:80},
            toppingPrices: { Onion: 20, Tomato: 20, Capsicum: 25, Mushroom: 35, "Premium Paneer": 50, "Premium Jalapeno": 45 },
            sidePrices: { "Garlic Bread": 99, "Stuffed Garlic Bread": 149, "French Fries": 79, "Pepsi 500ml": 60 }
        },
        totalPrice:150
    },
    reducers:{
        setPizza:(state, action)=>{
            const {inputField, inputValue} = action.payload
            state.pizza[inputField] = inputValue
            if (inputField === 'size' && inputValue !== 'large') {
                state.pizza.toppings = state.pizza.toppings.filter(
                topping => topping !== "Premium Paneer" && topping !== "Premium Jalapeno");
            }
            state.totalPrice = calculateTotalPrice(state)

        },
        toggleTopping:(state, action)=>{
            const toppingName = action.payload
            if(state.pizza.toppings.includes(toppingName)){
                state.pizza.toppings = state.pizza.toppings.filter(t=> t !== toppingName);
            } else {
                state.pizza.toppings.push(toppingName)
            }
            state.totalPrice = calculateTotalPrice(state)
        },
        toggleSides:(state, action)=>{
            const sideName = action.payload
            if(state.pizza.sides.includes(sideName)){
                state.pizza.sides = state.pizza.sides.filter(s=> s !== sideName);
            }else{
                state.pizza.sides.push(sideName)
            }
            state.totalPrice = calculateTotalPrice(state)
        },
        menuEmpty:(state)=>{
            state.pizza = {
            size:'medium',
            crust:'classic',
            toppings:[],
            sides:[]
            }
        }
    }
});

export const {setPizza, toggleTopping,toggleSides, menuEmpty} = pizzaSlice.actions
export default pizzaSlice.reducer