import React, { useEffect, useState } from 'react'
import { API } from '../Api'

const Thankyou = () => {

    const[userData,setUserData]=useState('')
    const token = localStorage.getItem('token')
    const match_user = userData && userData.filter(user=>user.token === token)
    const userName =match_user && match_user[0].user_name

    useEffect(()=>{
        const fetchUserData= async ()=>{
            const data = await API.get('users/',{
                headers:{
                    Authorization : `${token}`
                }
            })
            console.log(data.data);
            setUserData(data.data)

        }

        fetchUserData()
    },[token])

  return (
    <div style={{'minHeight':'60vh'}}>
     <main class="order">Thank you for Ordering</main>
    <main class="order-info">
    Thank you for ordering {userName}. <br />We received your request.{' '}
                    <br />
                    <br />
                    Our staff will be contacting with you to tell next steps.
    </main>
    <main  class="back-home">
        <button class="back-btn" onClick={()=>window.location.assign('/')}>
            BACK TO HOME 
        </button>
    </main>
    </div>
  )
}

export default Thankyou