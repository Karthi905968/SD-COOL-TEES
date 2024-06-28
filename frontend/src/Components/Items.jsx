import React, { useEffect, useState } from 'react'
import { API } from '../Api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Items = ({product}) => {

const token = localStorage.getItem('token') 
const navigate=useNavigate()
const cart_item= useSelector(state=>state.carts.cart)
const[particularProduct,setParticularProducet]=useState(null)

  const addCart = async (product) => {
    try {
        if (token) {
            console.log(product);
            
            await API.post('cart/add/', {
                items: product.id,
                quantity: 1
            }, {
                headers: { Authorization: `${token}` }
            });
          alert('Added to Cart')
          window.location.assign('/')

          
          // window.location.assign('/')

        } else {
          alert('Please Login to Add Item to Cart');
          navigate('/signup');
        }
    } catch (error) {
        console.error('Error adding item to cart:', error);
        throw new Error(error);
    }
};

const removeCart = async (id)=>{
    const userConfirm = window.confirm('Are you sure you want to remove from cart?')
    if(userConfirm){
       try{
        await API.delete(`cart/delete/${particularProduct.id}/`,{
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

useEffect(()=>{
    if(cart_item.length > 0){
        const matchedCart = cart_item.filter(cart=>cart.items === product.id)
        if(matchedCart.length>0){
            setParticularProducet(matchedCart[0])
        }else{
            setParticularProducet(null)
        }
    }
},[cart_item,product.id])


  return (
    <section className="cGroup">
      <main className="photo">
        <img
          src={product.image}
          alt={product.name}
          width="100%"
        />
      </main>
      <main className="bottom">
        <p className="b-para">
          {product.name} <br />
          <span className="price">${product.price}</span>
        </p>
     {
        particularProduct && particularProduct.quantity > 0 ?
        ( <button className='b-button remove' onClick={()=>removeCart(product.id)}>REMOVE</button>):
        ( <button className='b-button' onClick={()=>addCart(product)}>ADD TO CART</button>)
     }
      </main>
    </section>
  )
}

export default Items