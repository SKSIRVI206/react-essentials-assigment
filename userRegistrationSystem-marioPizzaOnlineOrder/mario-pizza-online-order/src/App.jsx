import { useState } from 'react'
import './App.css'
function App (){
  //customer information state
  const[customerInfo,setCustomerInfo]=useState({
    name:'',
    phone:'',
    email:'',
    address:'',
    isDelivery:true
  });
  //pizza information state
  const[pizzaOrder,setPizzaOrder] = useState({
    size:'medium',
    crust:'regular',
    toppings:[],
    sides:[],
    quantity:1,
    specialInstruction:''
  });
  //form behavier
  const[formState,setFormState] = useState({
    errors:{},
    isSubmitting:false,
    showOrderSummary:false,
    currentErrors:{}
  }); 
  const calculateTotal=()=>{
    let total = 0;
    const sizePrice ={
      small:12.99,
      medium:15.99,
      large:18.99,
      xlarge:21.99
    };
    total +=sizePrice[pizzaOrder.size];
    const crustPrice={
      regular:0,
      thin:1.00,
      thick:2.00,
      stuffed:3.00
    };
    total +=crustPrice[pizzaOrder.crust];
    total +=pizzaOrder.toppings.length*1.5;
    let sidesTotal = pizzaOrder.sides.reduce((sum,side)=>sum+side.price,0);
    total += sidesTotal;
    let finalTotal = total*pizzaOrder.quantity;
    if(customerInfo.isDelivery){
      finalTotal +=2;
    }
    return finalTotal.toFixed(2);
  }

  return(
    <div className='App'>
      <header>
        <h1>mario's pizza</h1>
        <p>the best in the pizza</p>
      </header>
      <main>
        <form>
          <h2>place your pizza order</h2>
          <section>
            <h3>customer information</h3>
            <div className='form-group'>
              <label htmlFor="customer-name">customer name</label>
              <input type="text" id='customer-name' name='name' value={customerInfo.name} onChange={(e)=>setCustomerInfo({...customerInfo,name:e.target.value})} placeholder='Enter Your Name'/>
            </div>
            <div className='form-group'>
              <label htmlFor="phone-number">phone number</label>
              <input type="tel" id='phone-number' name='phone' value={customerInfo.phone} onChange={(e)=>setCustomerInfo({...customerInfo,phone:e.target.value})} placeholder='8752623451'/>
            </div>
            <div className='form-group'>
              <label htmlFor="email">email</label>
              <input type="email" id='email' name='email' value={customerInfo.email} onChange={(e)=>setCustomerInfo({...customerInfo,email:e.target.value})} placeholder="name@example.com"/>
            </div>
             <div className='form-group'>
              <label htmlFor="address">address</label>
              <textarea type="text" id='address' name='address' value={customerInfo.address} onChange={(e)=>setCustomerInfo({...customerInfo,address:e.target.value})} rows={3} placeholder="Enter your full street address, including city, state, and ZIP code."/>
            </div>
            <div className='form-group'>
              <fieldset>
                <legend>order type</legend>
                <div className='radio-group'>
                  <label><input type="radio" name="ordertype" checked={customerInfo.isDelivery === true} onChange={(e)=>setCustomerInfo({...customerInfo,isDelivery:true})} />delivery</label>
                </div>
                <div className='radio-group'>
                  <label><input type="radio" name="ordertype" checked={customerInfo.isDelivery === false} onChange={(e)=>setCustomerInfo({...customerInfo,isDelivery:false})}/>pickup</label>
                </div>
              </fieldset>
            </div>
          </section>
          <section>
            <h3>customize your pizza</h3>
            <div className='form-group'>
              <label htmlFor="pizza-size">select pizza size</label>
              <select 
              name="size" 
              id="pizza-size"
              value={pizzaOrder.size}
              onChange={(e)=>setPizzaOrder({...pizzaOrder,size:e.target.value})}>
                <option value="small">small-$12.99</option>
                <option value="medium">medium-$15.99</option>
                <option value="large">large-$18.99</option>
                <option value="xlarge">xlarge-$21.99</option>
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor="crust-type">select crust type</label>
              <select 
                name="crust" 
                id="crust-type"
                value={pizzaOrder.crust}
                onChange={(e)=>setPizzaOrder({...pizzaOrder,crust:e.target.value})}>
                  <option value="regular">regular</option>
                  <option value="thin">thin (+$1.00)</option>
                  <option value="thick">thick (+$2.00)</option>
                  <option value="stuffed">stuffed (+$3.00)</option>
                </select>
            </div>
            <div className='form-group'>
              <fieldset>
                <legend>select your topping (each +$1.50)</legend>
                <div className='topping-grid'>
                  {['pepperoni','mushrooms','onions','sausage','bacon','extra cheese', 'black olives','green peppers'].map(topping=>(
                    <label key={topping} className='topping-option'>
                      <input 
                      type="checkbox" 
                      name="toppings"
                      checked={pizzaOrder.toppings.includes(topping)} 
                      onChange={(e)=>{
                        if(e.target.checked){
                          setPizzaOrder({
                            ...pizzaOrder,
                            toppings:[...pizzaOrder.toppings,topping]
                          })
                        }else{
                          setPizzaOrder({
                            ...pizzaOrder,
                            toppings:pizzaOrder.toppings.filter(t=>t!==topping)
                          })
                        }
                      }}/>
                      {topping.charAt(0).toUpperCase()+topping.slice(1)}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
            <div className='form-group'>
              <fieldset>
                <legend>select your sides & drinks</legend>
                <div className='sides-grid'>
                  {[{name:'Garlic Knots',price:4.99},{name:'Cinnamon Sticks',price:5.99},{name:'Marinara Dip',price:0.99},{name:'Ranch Dip',price:0.99},{name:'Soda 2L',price:20.00},{name:'Water Bottle',price:20.00},].map(side=>(
                    <label key={side.name} className='sides-option'>
                      <input 
                      type="checkbox" 
                      name="sides"
                      checked={pizzaOrder.sides.some(s=>s.name===side.name)} 
                      onChange={(e)=>{
                        if(e.target.checked){
                          setPizzaOrder({
                            ...pizzaOrder,
                            sides:[...pizzaOrder.sides,side]
                          });
                        }else{
                          setPizzaOrder({
                            ...pizzaOrder,
                            sides:pizzaOrder.sides.filter(s=>s.name!==side.name)
                          })
                        }
                      }}/>{`${side.name} ${side.price} `}</label>
                  ))}
                </div>
              </fieldset>
            </div>
            <div className='form-group'>
              <label htmlFor="quantity">order quantity</label>
              <input type="number" name="quantity" id="quantity" min={1} value={pizzaOrder.quantity} onChange={(e)=>setPizzaOrder({
                ...pizzaOrder,
                quantity:e.target.value
              })} />
            </div>
            <div className='form-group'>
              <label htmlFor="specialInstruction">special instruction</label>
              <input type="text" name='specialInstruction' id='specialInstruction' value={pizzaOrder.specialInstruction} onChange={(e)=>setPizzaOrder({
                ...pizzaOrder,
                specialInstruction:e.target.value
              })} placeholder="e.g. Extra crispy crust, gate code 1234, or 'please leave on the porch table'..." />
            </div>
          </section>
          <section>
            <h3>order summary</h3>
            <div className='order-summary'>
              <div className='order-detail'>
                <div className='item-name'>
                  {pizzaOrder.size} pizza and {pizzaOrder.crust} crust
                </div>
                <div className='item-price'>
                  {(()=>{
                    let total = 0;
                    const sizePrices = { small:12.99, medium:15.99, large:18.99, xlarge:21.99};
                    const crustPrices = { regular:0, thin:1.00, thick:2.00, stuffed:3.00};
                    total+=sizePrices[pizzaOrder.size];
                    total+=crustPrices[pizzaOrder.crust];
                    return(total.toFixed(2))
                  })()}
                </div>
              </div>
              {pizzaOrder.toppings.length > 0 &&(
                <div className='order-detail'>
                  <div className='item-name'>
                    {pizzaOrder.toppings.join(', ')}
                  </div>
                  <div className='item-price'>
                    {pizzaOrder.toppings.length*1.5}
                  </div>
                </div>
              )}
              {pizzaOrder.sides.length >0 && (
                <div className='sides-summary'>{pizzaOrder.sides.map((side,index)=>(
                <div key={index} className='order-detail'>
                  <div className='item-name'>{side.name}</div>
                  <div className='item-price'>{side.price}</div>
                </div>))}</div>
              )}
              {customerInfo.isDelivery && (
                <div className='order-detail'>
                  <div className='item-name'>delivery fee</div>
                  <div className='item-price'>2.00</div>
                </div>
              )}
              <div className='summary-total'>
                <div className='total-label'>total:</div>
                <div className='total-price'>{calculateTotal()}</div>
              </div>
              {customerInfo.name && (
                <div className='customer-details'>
                  <p><strong>Customer Name : </strong>{customerInfo.name}</p>
                  {customerInfo.phone && <p><strong>Phone Number: </strong>{customerInfo.phone}</p>}
                  {customerInfo.isDelivery ? (
                    <p><strong>deliver to: </strong>{customerInfo.address || 'adress needed'}</p>
                  ):(
                    <p><strong>Pikcup</strong> at Mario's Pizza Online Order</p>
                  )}
                </div>
              )}
            </div>
          </section>
          <button type='submit' className='submit-btn' disabled={formState.isSubmitting}>
            {formState.isSubmitting ? (
              <>
              <span className='loading-spinner'></span>
              Processing Order...
              </>
            ):(
              `place order - ${calculateTotal()}`
              )}
            </button>
        </form>
      </main>
      <footer>
        <p>&copy; 2024 mario's pizza online. all rights reserved</p>
      </footer>
    </div>
  )
}
export default App

