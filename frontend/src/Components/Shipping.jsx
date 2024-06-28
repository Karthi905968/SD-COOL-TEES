import React, { useEffect, useState } from 'react';
import {useSelector } from 'react-redux';
import { API } from '../Api';
import { AxiosHeaders } from 'axios';
import ShippingItem from './ShippingItem';




function Shipping() {
  const cart_item = useSelector((state) => state.carts.cart);
  const [all_product,setProduct]=useState()
  const token = localStorage.getItem('token') 
  const [full_name, setFullName] = useState(''),
  [phone, setPhone] = useState(''),
  [address, setAddress] = useState(''),
  [pincode, setPincode] = useState(''),
  [apt, setApt] = useState(''),
  [city, setCity] = useState(''),
  [state, setState] = useState('')


  let subTotal = 0
  let totalQuantity = 0

  const fetchItems = async ()=>{
    const items = await API.get('items/',AxiosHeaders)
    setProduct(items.data);
 }

cart_item.forEach((cart)=>{
 const particular_product = all_product && all_product.filter(product=>product.id === cart.items)
 subTotal += particular_product  && particular_product[0].price * cart.quantity
 totalQuantity += cart.quantity
})


const handleorder= async (e)=>{

    e.preventDefault()
    let payload = {
        total_price: subTotal.toFixed(2),
        full_name: full_name,
        address_line1: address,
        address_line2: apt,
        city: city,
        state: state,
        postal_code: pincode,
        country: 'US',
        telephone: phone
    };
    console.log(payload);
  if(subTotal>0){
    try{
      await API.post('/order/add/',payload,{
        headers: {
          Authorization: `${token}`, // Correctly interpolate the token
        },
      })
      window.location.assign('/thankyou')
    }catch(err){
        alert(err)
        console.log(err);
    }
  }else{
    alert('Cannot plase order ! Please add items to cart.')
  }

}

 useEffect(()=>{
  fetchItems()
 },[subTotal])

  return (
    <div>
      {/* Shipment section */}
      <div style={{ minHeight: '55vh' }}>
        <div className="order-section">
          <main className="order">Order your items</main>
          <div className="shipment-sec1">
            <h2 style={{ fontSize: '2.5rem' }}>Shipment Details</h2>
            <p style={{ fontSize: '1.5rem' }}>
              Please check your details and confirm it.
            </p>
            <table className="shipment-table">
              <tbody>
               
                {
                    cart_item && cart_item.map((item)=>{
                        return(
                            <ShippingItem id={item} key={item.id}/>
                        )
                    })
                }
                <tr>
                  <td><hr /></td>
                  <td><hr /></td>
                </tr>
                <tr className="shipment-total">
                  <td><span style={{'fontWeight':'700'}}>Total Price</span></td>
                  <td>
                    <div className="shipment-info" >
                      <span style={{'fontWeight':'700'}}>{totalQuantity}</span>
                      <p className="shipment-price" style={{'fontWeight':'700'}}>$ {subTotal.toFixed(2)}</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <main className="addres-section" style={{ marginTop: '2rem' }}>
              <form action="" onSubmit={handleorder}>
                <div className="address-line1" style={{ marginTop: '1rem' }}>
                  <label htmlFor="full-name">Full Name</label> <br />
                  <input
                    type="text"
                    name="name"
                    id="full-name"
                    className="adress-input"
                    placeholder="Enter recipient’s full name"
                    required
                    onChange={(e)=>setFullName(e.target.value)}
                  />
                </div>

                <div className="address-line1" style={{ marginTop: '1rem' }}>
                  <label htmlFor="phone">Phone Number</label> <br />
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="adress-input"
                    placeholder="Enter phone number"
                    required
                    onChange={(e)=>setPhone(e.target.value)}
                  />
                </div>

                <div className="address-line1" style={{ marginTop: '1rem' }}>
                  <label htmlFor="street-address">Street Address or P.O Box</label> <br />
                  <input
                    type="text"
                    name="address"
                    id="street-address"
                    className="adress-input"
                    placeholder="Enter Street Address or P.O Box"
                    required
                    onChange={(e)=>setAddress(e.target.value)}
                  />
                </div>

                <div className="address-line1" style={{ marginTop: '1rem' }}>
                  <label htmlFor="pin-code">Pin Code</label> <br />
                  <input
                    type="text"
                    name="pinCode"
                    id="pin-code"
                    className="adress-input"
                    placeholder="Enter pin code"
                    required
                    onChange={(e)=>setPincode(e.target.value)}
                  />
                </div>

                <div className="address-line1" style={{ marginTop: '1rem' }}>
                  <label htmlFor="apt-suite">Apt, Suite, Unit, Building, Floor, etc.</label> <br />
                  <input
                    type="text"
                    name="aptSuite"
                    id="apt-suite"
                    className="adress-input"
                    placeholder="Apt, Suite, Unit, Building, Floor, etc."
                    required
                    onChange={(e)=>setApt(e.target.value)}
                  />
                </div>

                <div className="address-line1" style={{ marginTop: '1rem' }}>
                  <label htmlFor="city">City</label> <br />
                  <input
                    type="text"
                    name="city"
                    id="city"
                    className="adress-input"
                    placeholder="Enter city"
                    required
                    onChange={(e)=>setCity(e.target.value)}
                  />
                </div>

                <div className="address-line1" style={{ marginTop: '1rem' }}>
                  <label htmlFor="state">State</label> <br />
                  <input
                    type="text"
                    name="state"
                    id="state"
                    className="adress-input"
                    placeholder="Enter state"
                    required
                    onChange={(e)=>setState(e.target.value)}
                  />
                </div>
                <div className="adress-btn">
                  <button type="submit" className="address-submit-btn">Submit</button>
                </div>
              </form>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shipping;
