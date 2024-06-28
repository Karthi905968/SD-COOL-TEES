import React, { useEffect} from 'react';
import { API } from '../Api';
import { AxiosHeaders } from 'axios';
import {useDispatch} from 'react-redux'
import { listItems } from '../redux/items/ItemReducer';
import Products from './Products';
import { Outlet } from 'react-router-dom';


const Home = () => {
    const dispatch=useDispatch()
  

    useEffect(()=>{
      const fetchItems = async ()=>{
        const items = await API.get('items/',AxiosHeaders)
        dispatch(listItems(items.data))
     }
        fetchItems()
    },[dispatch])

  return (
    <>
    <Outlet/>
      <div className="section1">
        <img
          src="https://res.cloudinary.com/denmnkoks/image/upload/v1711008746/Screenshot_2024-03-21_at_1.41.53_PM-removebg-preview_kquv5m.png"
          alt=""
          className="sec1-img"
        />

        <img
          src="https://res.cloudinary.com/denmnkoks/image/upload/v1711097155/Screenshot_2024-03-22_at_2.15.04_PM-removebg-preview_kggi6r.png"
          alt=""
          className="sec1-img2"
        />
        <p className="sec1-txts">
          Cool Tees for <br />
          <span className="sec1-i-text">Men and Women</span>
        </p>
      </div>
      <h1 className="product">Products</h1>
      <div className="section2">
          <Products/>
      </div>
    </>
  );
};

export default Home;
