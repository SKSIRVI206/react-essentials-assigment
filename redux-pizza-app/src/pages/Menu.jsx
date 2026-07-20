import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPizza, toggleSides, toggleTopping, menuEmpty } from '../store/slice/pizzaSlice'
import { addToCart, clearCartError } from '../store/slice/cartSlice';
import { openModel, closeModel } from '../store/slice/uiSlice';
import Model from '../components/Model';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const toppingList = [
    { id: 'onion', name: 'Onion', price: 20 },
    { id: 'tomato', name: 'Tomato', price: 20 },
    { id: 'capsicum', name: 'Capsicum', price: 25 },
    { id: 'mushroom', name: 'Mushroom', price: 35 },
    { id: 'paneer', name: 'Premium Paneer', price: 50 },
    { id: 'jalapeno', name: 'Premium Jalapeno', price: 45 }
  ];
  const sidesList = [
    { id: 'garlic_bread', name: 'Garlic Bread', price: 99 },
    { id: 'stuffed_garlic', name: 'Stuffed Garlic Bread', price: 149 },
    { id: 'fries', name: 'French Fries', price: 79 },
    { id: 'pepsi', name: 'Pepsi 500ml', price: 60 }
  ];

  const pizza = useSelector(state => state.pizzaOrder.pizza)
  const totalPrice = useSelector(state => state.pizzaOrder.totalPrice);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setPizza({ inputField: name, inputValue: value }));
  }

  const handleMenuSubmit = (e) => {
    e.preventDefault();
    dispatch(addToCart({ newPizza: pizza, totalPrice: totalPrice }));
    dispatch(openModel());
  }
  const cartError = useSelector(state => state.cart.error);

  return (
    <form onSubmit={handleMenuSubmit}>
      <h1>Create Pizza Slice</h1>
      <p>For Your Pizza Order</p>
      
     
      <div className='form-group'>
        <label htmlFor="pizza-size">Pizza Size</label>
        <select name="size" id="pizza-size" value={pizza.size} onChange={handleInputChange}>
          <option value="medium">Medium</option>
          <option value="small">Small</option>
          <option value="large">Large</option>
        </select>
      </div>

      
      <div className='form-group'>
        <label htmlFor="crust-size">Crust Size</label>
        <select name="crust" id="crust-size" value={pizza.crust} onChange={handleInputChange}>
          <option value="classic">Classic</option>
          <option value="thin">Thin</option>
          <option value="thick">Thick</option>
          <option value="cheese">Cheese</option>
        </select>
      </div>

      
      <div className='toppings'>
        <p>Please choose your topping</p>
        {toppingList.map(topping => {
          const isPremium = topping.id === 'paneer' || topping.id === 'jalapeno';
          const isDisabled = isPremium && pizza.size !== 'large';
          return (
            <div key={topping.id} className='topping-option'>
              <label> 
                <input 
                  type="checkbox"
                  name="toppings" 
                  value={topping.name}
                  disabled={isDisabled} 
                  checked={pizza.toppings?.includes(topping.name) || false} 
                  onChange={() => dispatch(toggleTopping(topping.name))}
                />
                {topping.name} 
              </label>
              <span>Rs. {topping.price.toFixed(2)}</span>
            </div>
          )
        })}
      </div>

      
      <div className='sides'>
        <p>Please select your side and drinks</p>
        {sidesList.map(side => (
          <div key={side.id} className='sides-option'>
            <label> 
              <input 
                type="checkbox" 
                name="sides" 
                value={side.name} 
                checked={pizza.sides?.includes(side.name) || false} 
                onChange={() => dispatch(toggleSides(side.name))}
              />
              {side.name}
            </label>
            <span>Rs. {side.price}</span>
          </div>
        ))}
      </div>

      
      <div className='total-section'>
        <h3>Total Amount:</h3>
        <span>Rs. {totalPrice}</span>
      </div>

      <button type='submit'>Add To Cart</button>

      
      <Model>
        <div className="modal-content" style={{ padding: '15px', textAlign: 'center' }}>
          {cartError ? (
            
            <>
              <h2 style={{ color: 'red', marginBottom: "8px" }}>Selection Required!</h2>
              <p style={{ marginBottom: "15px", color: '#555' }}>{cartError}</p>
              <button 
                type="button" 
                onClick={() => {
                  dispatch(closeModel());
                  dispatch(clearCartError());
                }}
                style={{ background: 'red', color: "white", borderRadius: '5px', padding: "8px 15px", border: 'none', cursor: 'pointer' }}
              >
                Choose Toppings
              </button>
            </>
          ) : (
            
            <>
              <h2 style={{ color: 'green', marginBottom: "5px" }}>Added to Cart!</h2>
              <p style={{ lineHeight: '1.5', marginBottom: "5px", color: '#555' }}>Your custom pizza has been successfully added to your shopping cart.</p>
              <p style={{ lineHeight: '1.5', marginBottom: "15px", color: '#555' }}>You can check your shopping cart.</p>
              
              <div style={{ marginTop: '15px' }}>
                <h3 style={{ color: '#333', marginBottom: "10px" }}>Add More Pizza?</h3>
                <button 
                  type="button" 
                  onClick={() => {
                    dispatch(closeModel());
                    dispatch(menuEmpty()); 
                    navigate('/menu');
                  }}
                  style={{ background: 'green', color: "white", borderRadius: '5px', padding: "8px 15px", border: 'none', cursor: 'pointer' }}
                >
                  Yes
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    dispatch(closeModel());
                    dispatch(menuEmpty()); 
                    navigate('/cart');
                  }}
                  style={{ background: '#333', color: "white", borderRadius: '5px', padding: "8px 15px", border: 'none', marginLeft: '20px', cursor: 'pointer' }}
                >
                  No
                </button>
              </div>
            </>
          )}
        </div>
      </Model>
    </form>
  )
}

export default Menu;