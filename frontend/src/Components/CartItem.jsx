import React, { useEffect, useState } from 'react'
import { API } from '../Api'
import { AxiosHeaders } from 'axios'
import { useSelector } from 'react-redux'
const CartItem = (props) => {

    const id = props.id.items
    const[allProduct,setAllProduct]=useState([])
    const [numbers, setNumbers] = useState([]);
    const token = localStorage.getItem('token') 
    const particularProduct=allProduct.filter(product => product.id === id)
    const cartProduct = particularProduct[0]

    const cart_item= useSelector(state=>state.carts.cart)
    const matchedCart = cart_item.filter(cart=>cart.items === id)
    const product = matchedCart[0]
    

    const generateRandomNumbers = () => {
      let newNumbers = [];
      for (let i = 0; i < 6; i++) {
        newNumbers.push(Math.floor(Math.random() * 10)); // Generates random number between 0 and 99
      }
      setNumbers(newNumbers);
    };

const removeCart = async ()=>{
    const userConfirm = window.confirm('Are you sure you want to remove from cart?')
    if(userConfirm){
       try{
        await API.delete(`cart/delete/${product.id}/`,{
          headers: { Authorization: `${token}` }
      })
        alert('Removed from Cart')
        window.location.reload()
       }catch(err){
        console.error('Error adding item to cart:', err);
        throw new Error(err);
       }
    }else{
        window.location.reload()
    }
}

const increaseQuantity = async (quantity)=>{
    try{
        await API.put(`cart/update/${product.id}/`,{quantity:quantity},{
            headers:{Authorization:`${token}`}
        })
        window.location.reload()
       }catch(err){
        alert(err)
       }
}


const decreaseQuantity=async (quantity)=>{
   if(quantity<1){
    await API.delete(`cart/delete/${product.id}/`,{
        headers: { Authorization: `${token}` }
    })

    window.location.reload('')
   }else{
    try{
        await API.put(`cart/update/${product.id}/`,{quantity:quantity},{
            headers:{Authorization:`${token}`}
        })
        window.location.reload()
       }catch(err){
        alert(err)
       }
   }
}

    useEffect(()=>{
        const fetchItems = async ()=>{
            const items = await API.get('items/',AxiosHeaders)
            setAllProduct(items.data);
         }

         fetchItems()
         generateRandomNumbers()
    },[])

  return (
    <>
     <tr className="table-row" key={id}>
                <td>
                  <div className="WL-sec">
                    <div className="WL-img">
                      <img
                        src={cartProduct && cartProduct.image}
                        alt=""
                        className="wishlist-img"
                      />
                    </div>
                    <p className="W-content">
                      {cartProduct && cartProduct.name} <br />
                      <span className="W-id">#{numbers}</span>
                    </p>
                  </div>
                </td>
                <td>
                  <div className="amount-sec">
                    <button className="WL-buttons" onClick={()=>decreaseQuantity(props.id.quantity - 1)}>−</button> <span>{props.id.quantity}</span>
                    <button className="WL-buttons" onClick={()=>increaseQuantity(props.id.quantity + 1)}>+</button>
                  </div>
                </td>
                <td><span>{cartProduct && cartProduct.price}
                </span></td>
                <td>
                  <img
                    src="https://res.cloudinary.com/denmnkoks/image/upload/v1711529887/close_1_jro8fd.png"
                    alt=""
                    width="15px"
                    className="clear1"

                     onClick={()=>removeCart()}
                  />
                </td>
              </tr>      
    </>
  )
}

export default CartItem