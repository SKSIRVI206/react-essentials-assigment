import { createSlice} from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cartItems:[],
        cartTotalAmount:0,
        cartTotalQuantity:0,
        error:null
    },
    reducers:{
        addToCart:(state, action)=>{
            const {newPizza, totalPrice} = action.payload;
            if(!newPizza.toppings || newPizza.toppings.length === 0){
                state.error = "Please select at least one Topping before adding to cart";
                state.cartItems =[];
                state.cartTotalAmount = 0;
                state.cartTotalQuantity = 0;
                return
            }
            state.error = null
            const existingItem = state.cartItems.find(item=>{
                const isSizeSame = item.size === newPizza.size;
                const isCrustSame = item.crust === newPizza.crust;
                const isToppingsSame = item.toppings.slice().sort().join(',') === newPizza.toppings.slice().sort().join(',');
                const isSidesSame = item.sides.slice().sort().join(',') === newPizza.sides.slice().sort().join(',');
                return isSizeSame && isCrustSame && isToppingsSame && isSidesSame
            })
            if(existingItem){
                existingItem.quantity += 1;
                existingItem.itemTotalPrice += totalPrice;
            } else {
                state.cartItems.push({
                    ...newPizza,
                    quantity:1,
                    singlePrice:totalPrice,
                    itemTotalPrice:totalPrice
                })
            }
            state.cartTotalQuantity +=1;
            state.cartTotalAmount += totalPrice
        },
        updateQuantity:(state, action)=>{
            const {pizzaItem, type} = action.payload
            const existingItem = state.cartItems.find(item=>{
                const isSizeSame = item.size === pizzaItem.size;
                const isCrustSame = item.crust === pizzaItem.crust;
                const isToppingsSame = item.toppings.slice().sort().join(',') === pizzaItem.toppings.slice().sort().join(',');
                const isSidesSame = item.sides.slice().sort().join(',') === pizzaItem.sides.slice().sort().join(',');
                return isSizeSame && isCrustSame && isToppingsSame && isSidesSame
            })
            if(existingItem){
                if(type === 'increment'){
                    existingItem.quantity += 1;
                    existingItem.itemTotalPrice += existingItem.singlePrice;
                    state.cartTotalQuantity +=1;
                    state.cartTotalAmount += existingItem.singlePrice

                } else if(type === 'decrement'){
                    if(existingItem.quantity >1){
                        existingItem.quantity -=1;
                        existingItem.itemTotalPrice -=existingItem.singlePrice;
                        state.cartTotalQuantity -=1;
                        state.cartTotalAmount -= existingItem.singlePrice;
                    }
                }
            }
        },
        removeItem:(state, action)=>{
            const {pizzaItem} = action.payload
            const existingItem = state.cartItems.find(item=>{
                const isSizeSame = item.size === pizzaItem.size;
                const isCrustSame = item.crust === pizzaItem.crust;
                const isToppingsSame = item.toppings.slice().sort().join(',') === pizzaItem.toppings.slice().sort().join(',');
                const isSidesSame = item.sides.slice().sort().join(',') === pizzaItem.sides.slice().sort().join(',');
                return isSizeSame && isCrustSame && isToppingsSame && isSidesSame
            })
            if(existingItem){
                state.cartTotalQuantity -= existingItem.quantity;
                state.cartTotalAmount -= existingItem.itemTotalPrice;
                state.cartItems = state.cartItems.filter(item => item !== existingItem)
            }
        },
        clearCartError:(state)=>{
            state.error = null;
        },
        clearCart:(state)=>{
            state.cartItems = [],
            state.cartTotalAmount = 0,
            state.cartTotalQuantity = 0
        }
    }
});
export const {addToCart, updateQuantity, removeItem, clearCart, clearCartError} = cartSlice.actions
export default cartSlice.reducer