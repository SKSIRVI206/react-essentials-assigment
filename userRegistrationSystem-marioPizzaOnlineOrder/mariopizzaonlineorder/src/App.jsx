import React, { useState } from 'react'
import './App.css'
function App() {
  const toppings =['pepperoni','sausage','mushrooms','green peppers',
    'onions','black olives', 'extra cheese','bacon','pineapple','jalapenos',
    'tomatoes'
  ];
  const sides = [
    { id: 'breadsticks', name: 'Garlic Breadsticks', price: 4.99 },
    { id: 'mozzarella', name: 'Mozzarella Sticks', price: 5.99 },
    { id: 'wings', name: 'Buffalo Wings', price: 7.99 },
    { id: 'soda', name: '2-Liter Soda', price: 25.0 },
    { id: 'garlic-dip', name: 'Garlic Dipping Sauce', price: 0.75 },
    { id: 'marinara', name: 'Marinara Dip', price: 0.75 }
  ];
  const [customerInfo, setCustomerInfo] = useState(()=>{
    const savedCustomerInfo = localStorage.getItem('customerInfo');
    const initialCustomer = savedCustomerInfo ? JSON.parse(savedCustomerInfo) : null;
    return {
      name: initialCustomer?.name || '',
      phone: initialCustomer?.phone || '',
      email: initialCustomer?.email || '',
      address:initialCustomer?.address ||'',
      isDelivery:true
    }
  });

  const [pizzaOrder, setPizzaOrder] = useState({
    size:'medium',
    crust:'regular',
    toppings:[],
    sides:[],
    orderQuantity:1
  });

  const [formState, setFormState] = useState({
    errors:{},
    isSubmitting:false,
    showOrderSummary:false
  });

  const calculateTotalPrice =()=>{
    let total = 0;
    const sizePrices ={
      small:10.99,
      medium:15.99,
      large:20.99
    }
    total += sizePrices[pizzaOrder.size]
    const crustPrices = {
      regular:0,
      thin:1,
      thick:2,
      stuffed:3
    }
    total += crustPrices[pizzaOrder.crust]
    total += pizzaOrder.toppings.length *1.50;
    pizzaOrder.sides.forEach(sideId =>{
      const matchedSide = sides.find(s=>s.id === sideId);
      if(matchedSide){
        total += matchedSide.price;
      }
    })
    total *= pizzaOrder.orderQuantity;
    if(customerInfo.isDelivery){
      total = total + 5.00
    }
    return total.toFixed(2)
  }

  const handleCancel =()=>{
    setCustomerInfo({
      name:'',
      phone:'',
      email:'',
      address:'',
      isDelivery:true
    })
    setPizzaOrder({
      size:'medium',
      crust:'regular',
      toppings:[],
      sides:[],
      orderQuantity:1
    })
    setFormState({
      errors:{},
      isSubmitting:false,
      showOrderSummary:false
    })
  }
  const handleSubmit =(e)=>{
    e.preventDefault();
    const validationErrors = {};
    if(!customerInfo.name.trim() || customerInfo.name.length < 5){
      validationErrors.name = 'Please Enter Your Full Name'
    }
    const phoneRegex = /^\d{10}$/;
    if(!customerInfo.phone.trim() || !phoneRegex.test(customerInfo.phone.trim())){
      validationErrors.phone = 'Please Enter a valid 10 Digit Phone Number';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!customerInfo.email.trim() || !emailRegex.test(customerInfo.email.trim())){
      validationErrors.email = 'Please Enter a valid Email Address';
    }
    if(customerInfo.isDelivery && !customerInfo.address){
      validationErrors.address = 'Please Enter Your Delivery Address';
    }
    if(Object.keys(validationErrors).length > 0){
      setFormState({
        ...formState,
        errors: validationErrors
      })
      return
    }
    setFormState({
      ...formState,
      errors:{},
      isSubmitting:true
    })
    setTimeout(()=>{
      localStorage.setItem('customerInfo', JSON.stringify(customerInfo));
      setFormState({
        ...formState,
        errors:{},
        showOrderSummary:true
      })
    },2000)
  }
  
  if (formState.showOrderSummary) { 
  return (
      <div className="receipt-view">
        <div>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you, {customerInfo.name} your delicious pizza is being prepared!</p>
          <p>Your order number is {Math.floor(Math.random()*10000)}</p>
          <p>You Total Paid: Rs. {calculateTotalPrice()}</p>
          {customerInfo.isDelivery ? (
            <p>Hello {customerInfo.name} your pizza is send your address at {customerInfo.address} </p>
          ):(
            <p>Hello {customerInfo.name} you can pickup your pizza at Mario's pizza </p>
          )}
          <button onClick={handleCancel} className='order-again-btn'>Order Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className='App'>
      <header>
        <h1>Maria's Pizza - Online Ordering</h1>
        <p>Authentic Brooklyn Pizza Since 1952 </p>
      </header>
      <main>
        <form className='pizza-order-form' onSubmit={handleSubmit}>
          <h2>Place Your Order</h2>
          <section className='customer-info'>
            <h3>Customer Information</h3>
            <div className='form-group'>
              <label htmlFor="customer-name">Full Name</label>
              <input 
                type="text"
                id='customer-name'
                name='name'
                value={customerInfo.name}
                onChange={(e)=>setCustomerInfo({
                  ...customerInfo,
                  name:e.target.value
                })}
                placeholder='Enter Your Full Name'
                />
                {formState.errors.name && (
                  <span className='error-message'>{formState.errors.name}</span>
                )}
            </div>
            <div className='form-group'>
              <label htmlFor="phone-number">Phone Number</label>
              <input 
                type="tel"
                id='phone-number'
                name='phone'
                value={customerInfo.phone}
                onChange={(e)=>setCustomerInfo({
                  ...customerInfo,
                  phone:e.target.value
                })}
                placeholder='8562314596'
                />
                {formState.errors.phone && (
                  <span className='error-message'>{formState.errors.phone}</span>
                )}
            </div>
            <div className='form-group'>
              <label htmlFor="customer-email">Email</label>
              <input 
                type="email" 
                name="email" 
                id="customer-email"
                value={customerInfo.email}
                onChange={(e)=>setCustomerInfo({
                  ...customerInfo,
                  email:e.target.value
                })}
                placeholder='name@example.com'
                />
                {formState.errors.email && (
                  <span className='error-message'>{formState.errors.email}</span>
                )}
            </div>
            <div className='form-group'>
              <fieldset>
                <legend>Order Type</legend>
                <div className='radio-group'>
                  <label>
                    <input 
                      type="radio" 
                      name="orderType"
                      value='delivery'
                      checked={customerInfo.isDelivery === true}
                      onChange={(e)=>setCustomerInfo({
                        ...customerInfo,
                        isDelivery:true
                      })}/>
                    Delivery(30-45 minutes)
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="orderType" 
                      value='pickup'
                      checked={customerInfo.isDelivery === false}
                      onChange={(e)=>setCustomerInfo({
                        ...customerInfo,
                        isDelivery:false
                      })} />
                    Pickup (10-15 minutes)
                  </label>
                </div>
              </fieldset>
            </div>
            {customerInfo.isDelivery && (
              <div className='form-group'>
              <label htmlFor="customer-address">Address</label>
              <textarea
                name="address" 
                id="customer-address"
                value={customerInfo.address}
                onChange={(e)=>setCustomerInfo({
                  ...customerInfo,
                  address:e.target.value
                })}
                placeholder='123 Main St, Brooklyn, NY 1001'
                rows={3}
                />
                {formState.errors.address && (
                  <span className='error-message'>{formState.errors.address}</span>
                )}
              </div>
            )}
          </section>
          <section className='pizza-customization'>
            <h3>Build Your Pizza </h3>
            <div className='form-group'>
              <label htmlFor="pizza-size">Pizza Size</label>
            <select 
              name="size" 
              id="pizza-size"
              value={pizzaOrder.size}
              onChange={(e)=>setPizzaOrder({
                ...pizzaOrder,
                size:e.target.value
              })}>
                <option value="small">Small 10" - Rs. 10.99</option>
                <option value="medium">Medium 12" - Rs. 15.99</option>
                <option value="large">Large 14" - Rs. 20.99</option>
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor="pizza-crust">Crust Type</label>
              <select 
                name="crust" 
                id="pizza-crust"
                value={pizzaOrder.crust}
                onChange={(e)=>setPizzaOrder({
                  ...pizzaOrder,
                  crust:e.target.value
                })}>
                  <option value="regular">Regular Crust</option>
                  <option value="thin">Thin Crust [+Rs. 1.00]</option>
                  <option value="thick">Thick Crust [+Rs. 2.00]</option>
                  <option value="stuffed">Stuffed Crust [+Rs. 3.00]</option>
                </select>
            </div>
            <div className='form-group'>
              <fieldset>
                <legend>Your Toppings [Each +Rs. 1.50]</legend>
                <div className='topping-grid'>
                  {toppings.map(topping =>(
                    <label key={topping} className='topping-option'>
                      <input 
                        type="checkbox" 
                        name="toppings"
                        value={topping}
                        checked={pizzaOrder.toppings.includes(topping)}
                        onChange={(e)=>{
                          if(e.target.checked){
                            setPizzaOrder({
                              ...pizzaOrder,
                              toppings:[...pizzaOrder.toppings, topping]
                            })
                          }else{
                            setPizzaOrder({
                              ...pizzaOrder,
                              toppings:pizzaOrder.toppings.filter(t=>t !==topping)
                            })
                          }
                        }} />
                      {topping.charAt(0).toUpperCase()+topping.slice(1)}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
            <div className='form-group'>
              <fieldset>
                <legend>Sides</legend>
                <div className='sides-grid'>
                  {sides.map(side =>(
                    <label className='sides-option' key={side.id}>
                      <input 
                        type="checkbox" 
                        name="sides"
                        value={side.id}
                        checked={pizzaOrder.sides.includes(side.id)}
                        onChange={(e)=>{
                          if(e.target.checked){
                            setPizzaOrder({
                              ...pizzaOrder,
                              sides:[...pizzaOrder.sides, side.id]
                            })
                          }else{
                            setPizzaOrder({
                              ...pizzaOrder,
                              sides:pizzaOrder.sides.filter(s => s !== side.id)
                            })
                          }
                        }}/>
                      <span>{side.name}</span>
                      <span>Rs. {side.price}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
            <div className='form-group'>
              <label htmlFor="orderQty">Order Qty</label>
              <input 
                type="number" 
                name="orderQuantity" 
                id="orderQty"
                step='1'
                value={pizzaOrder.orderQuantity}
                onChange={(e)=>setPizzaOrder({
                  ...pizzaOrder,
                  orderQuantity:e.target.value
                })} />
            </div>
          </section>
          <section className='order-summary'>
            <h3>Order Summary</h3>
            <div>
              <div className='summary-item'>
                <span className='item-name'>{pizzaOrder.size.charAt(0).toUpperCase()+pizzaOrder.size.slice(1)} Pizza Size</span>
                <span className='item-price'>Rs. {(()=>{
                  const sizePrices = { small : 10.99, medium:15.99, large:20.99}
                  return sizePrices[pizzaOrder.size].toFixed(2)
                })()}
                </span>
              </div>
            </div>
            {pizzaOrder.crust !== 'regular' && (
              <div className='summary-item'>
                <span className='item-name'>{pizzaOrder.crust.charAt(0).toUpperCase()+pizzaOrder.crust.slice(1)} Crust</span>
                <span className='item-price'>Rs. {(()=>{
                  const crustPrices = { regular:0, thin:1,thick:2,stuffed:3}
                  return crustPrices[pizzaOrder.crust].toFixed(2)
                })()}</span>
              </div>
            ) }
            {pizzaOrder.toppings.length > 0  && (
              <div className='summary-item'>{
                pizzaOrder.toppings.map(topping=>(
                  <span className='item-name'>{topping.charAt(0).toUpperCase()+topping.slice(1)}</span>
                ))
              }
              <span className='item-price'>Rs. {(()=>{
                const toppingTotal = pizzaOrder.toppings.length * 1.5;
                return toppingTotal.toFixed(2)
              })()}</span>
              </div>
            )}
            {pizzaOrder.sides.length > 0 && (
              <div>{pizzaOrder.sides.map(sideId=>{
                const matchedSide = sides.find(s=>s.id === sideId)
                if(!matchedSide) return null
                return (
                  <div className='summary-item'>
                    <span className='item-name'>{matchedSide.name}</span>
                    <span className='item-price'>Rs. {matchedSide.price}</span>
                  </div>
                )
              })}</div>
            )}
            {customerInfo.isDelivery && (
              <div className='summary-item'>
                <span className='item-name'>Delivery Fee</span>
                <span className='item-price'>Rs. 5.00</span>
              </div>
            )}
            <div className='total-section'>
              <span className='total-label'>Total Amount:</span>
              <span className='total-price'>Rs. {calculateTotalPrice()}</span>
            </div>
            {customerInfo.name && (
              <div className='customer-detail'>
                <p><strong>Customer Name:</strong>{customerInfo.name}</p>
                {customerInfo.phone && <p><strong>Phone Number:</strong>{customerInfo.phone}</p>}
                {customerInfo.isDelivery ? (
                  <p><strong>Deliver To: </strong>{customerInfo.address || 'Address Needed'}</p>
                ):(
                  <p><strong>Pickup:</strong> at Mario's Pizza (Est. 20-30 Minutes)</p>
                )}
              </div>
            )}
          </section>
          <div className='action-btn'>
            <button type='button' onClick={handleCancel} className='cancel-btn'>Cancel Order</button>
            <button type='submit' className='submit-btn' disabled={formState.isSubmitting}>{formState.isSubmitting ? 'Processing Order...': `Place Order - Rs. ${calculateTotalPrice()}`}</button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default App

