import React, { useEffect, useState } from 'react'
import { API } from '../Api'
import { AxiosHeaders } from 'axios'
import { useSelector } from 'react-redux'
const ShippingItem = (props) => {

    const id = props.id.items
    const[allProduct,setAllProduct]=useState([])
    const particularProduct=allProduct.filter(product => product.id === id)
    const cartProduct = particularProduct[0]
    const cart_item= useSelector(state=>state.carts.cart)
    const matchedCart = cart_item.filter(cart=>cart.items === id)
    const product = matchedCart[0]

    





    useEffect(()=>{
        const fetchItems = async ()=>{
            const items = await API.get('items/',AxiosHeaders)
            setAllProduct(items.data);
         }

         fetchItems()

    },[])

  return (
    <>
       <tr>
                  <td>{cartProduct && cartProduct.name}</td>
                  <td>
                    <div className="shipment-info">
                      <span>{cartProduct && product.quantity}</span>
                      <p className="shipment-price">$ {cartProduct && cartProduct.price}</p>
                    </div>
                  </td>
                </tr>
    </>
  )
}

export default ShippingItem