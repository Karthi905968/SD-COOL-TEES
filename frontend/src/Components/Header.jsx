import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../Api';
import { addcart } from '../redux/cart/cartReducer';
import { useDispatch } from 'react-redux';
const Header = () => {

  const token = localStorage.getItem('token')  ? localStorage.getItem('token') : ''
  const navigate = useNavigate()

  const cart_no=useSelector(state=>state.carts.cart)

  const dispatch=useDispatch()



  const handleLogout = () => {

    const userConfirm = window.confirm('Are you sure you want to logout?')
    if(userConfirm){
      localStorage.clear()
      navigate('/')
      window.location.reload()
    }
  else{
    window.location.assign('/')
  }
    
  }


  

  useEffect(()=>{
    const handleCart = async () => {
      
      try {
        const response = await API.get('cart/', {
          headers: { Authorization: `${token}` }
        });
        const cart_items = response.data;
        dispatch(addcart(cart_items))
  
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    }
   if(token){
    handleCart()
   }
  },[token,dispatch])



  return (
    <nav>
      <section className="nav-sec">
       <a href="/">
       <img
          src="https://res.cloudinary.com/denmnkoks/image/upload/v1711443436/cooltees-logo_aschuy.png"
          alt=""
          className="logo-CT"
        />
       </a>

        <ol className="nav-ol">
          <li>
          {
            token &&  <Link to='/cart'> <i className="fa fa-shopping-cart" aria-hidden="true"></i>
           <span> <sup>{cart_no.length}</sup></span></Link>
          }
          </li> 
          <li>
            {
              token ?
                (<span onClick={handleLogout} style={{ 'cursor': 'pointer' }}>Logout</span>)
                :
                (<Link to={'/signin'} style={{ 'color': 'black' }}><i className="fa fa-user" aria-hidden="true"></i></Link>)
            }
          </li>
        </ol>

        <div className="menu-bar">
          <i className="fa fa-bars" aria-hidden="true"></i>
        </div>
      </section>
    </nav>
  );
};

export default Header;
