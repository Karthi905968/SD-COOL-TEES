import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import { API } from '../Api';
import { AxiosHeaders } from 'axios';
import { addSubTotal } from '../redux/cart/cartReducer';



function Cart() {

  const cart_item = useSelector((state) => state.carts.cart);
  const TotalAmount = useSelector(state=>state.carts.subTotal)
  console.log(TotalAmount);
  const [all_product,setProduct]=useState()
  const dispatch=useDispatch()
  const navigate = useNavigate();
  let subTotal = 0

  const fetchItems = async ()=>{
    const items = await API.get('items/',AxiosHeaders)
    setProduct(items.data);
 }

cart_item.forEach((cart)=>{
 const particular_product = all_product && all_product.filter(product=>product.id === cart.items)
 subTotal += particular_product  && particular_product[0].price * cart.quantity
})

const nextStep=()=>{
  window.location.assign('/shipping')
}



 useEffect(()=>{
  fetchItems()
  if(subTotal){
    console.log(subTotal);
    dispatch(addSubTotal(subTotal))
  }
 },[subTotal,dispatch])

  return (
    <div>
      {/* Cart Section */}
      <div className="cart-sec1">
        <h1 className="wishlist">Shopping Cart</h1>
        {cart_item && cart_item.length > 0 ? (
          <>
            <div className="wishlist-details">
              <table className="wishlist-table" cellSpacing="5px" cellPadding="5px" width="100%">
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left' }}>Product</th>
                    <th>Amount</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart_item.map((item) => (
                    <CartItem id={item} key={item.id} />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="check-out">
              <div style={{ width: '20rem' }}></div>
              <p className="total-cost">
                Total Cost: <span>$ {TotalAmount.toFixed(2)}</span>
              </p>
              <div className="shop-btns">
                <div className="check-out-btn shopping-btn" onClick={() => navigate('/')}>
                  Continue Shopping
                </div>
                <div className="check-out-btn next-btn" onClick={()=>nextStep()}>Next Step</div>
              </div>
            </div>
          </>
        ) : (
        <>
          <h3 className='cart-empty'>Cart is Empty</h3>
          <div className="check-out-btn shopping-btn" onClick={() => {navigate('/')}} style={{'margin':'0 auto'}}>
                  Continue Shopping
          </div>
        </>
        )}
      </div>
    </div>
  );
}

export default Cart;
