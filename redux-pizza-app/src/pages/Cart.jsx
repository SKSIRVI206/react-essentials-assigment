import React, { useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { clearCart, removeItem, updateQuantity } from '../store/slice/cartSlice' 
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const cartTotalAmount = useSelector(state => state.cart.cartTotalAmount);
  const cartTotalQuantity = useSelector(state => state.cart.cartTotalQuantity);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOrdered, setIsOrdered] = useState(false);

  
  const handlePlaceOrder = () => {
    setIsOrdered(true); 
    dispatch(clearCart()); 
  }

  
  if (isOrdered) {
    return (
      <div className='order-success'>
        <h2>Order Placed Successfully!</h2>
        <p>Your delicious pizza is being prepared and will arrive soon.</p>
        <button 
          onClick={() => { navigate('/menu'); setIsOrdered(false)} }
        >
          Order More Pizzas
        </button>
      </div>
    )
  }

  if(cartItems.length === 0){
    return(
      <div className='cart-empty'>
        <h2>Your Cart Is Empty!</h2>
        <p>Go back to the Menu to build your delicious pizza</p>
      </div>
    )
  }

  return (
    <div className='cart'>
      <div className='cart-items'>
        <h2>Your Selected Pizza Items ({cartTotalQuantity})</h2>
        <hr />
        {cartItems.map((item,index)=>(
          <div className='cart-item' key={index}>
            <div className='cart-item-description'>
              <h3>{item.size} Pizza ({item.crust} Crust)</h3>
              <p><strong>Toppings:</strong> {item.toppings.length > 0 ? item.toppings.join(', ') : 'None'}</p>
              <p><strong>Sides:</strong> {item.sides.length > 0 ? item.sides.join(', ') : 'None'}</p>
            </div>
            <div className='cart-item-meta'>
              <div>
                <button className='decrement-btn' onClick={()=>dispatch(updateQuantity({pizzaItem:item, type:'decrement'}))}>-</button>
                <span>{item.quantity}</span>
                <button className='increment-btn'onClick={()=>dispatch(updateQuantity({pizzaItem:item, type:'increment'}))}>+</button>
              </div>
              <div>
                <span>Rs. {item.itemTotalPrice}</span>
              </div>
              <div>
                <button className='delete-btn' onClick={()=>dispatch(removeItem({pizzaItem:item}))}>Delete</button>
              </div>
            </div>
          </div>
        ))}
        <button className='clear-cart-btn' onClick={()=>dispatch(clearCart())}>Clear Cart</button>
      </div>
      <div className='cart-summary'>
        <h2>Order Summary</h2>
        <hr />
        <div>
          <span>Total Items:</span>
          <strong>{cartTotalQuantity}</strong>
        </div>
        <div>
          <span>Grand Total:</span>
          <strong>Rs.{cartTotalAmount}</strong>
        </div>
        <button className='place-order-btn' onClick={handlePlaceOrder}>Place Order</button>
      </div>
    </div>
  )
}

export default Cart