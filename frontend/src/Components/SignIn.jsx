import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { API } from '../Api';
export const SignIn = () => {

    const navigate = useNavigate()
    const[email,setEmail]=useState()
    const[password,setPassword]=useState()
    const [toggle,setToggle] = useState(false)
    const[keepSignIn,setKeepSignIn]=useState(false)
    console.log(keepSignIn);

    const handleSubmit= async (e)=> {
     e.preventDefault()
     const payload={
      email:email,
      password:password
     }

     try{
      const userData = await API.post('users/signin/',payload)
      localStorage.setItem('token',userData.data.token)
      
      alert('Logged In Successfully')
      navigate('/')
     }
     catch{
      alert('Please provide valid Email or Password')
     }
    }

    const handleToggle=()=>{
        if(toggle){
            setToggle(false)
        }else{
            setToggle(true)
        }
    }
    

    const handleCancle=()=>{
        navigate('/')
      }


    

  return (
    <div className="logout-page">
      <form  className="logout-form" onSubmit={handleSubmit}>
        <section className="form-cancel" onClick={handleCancle}>
          <i className="fa fa-times" aria-hidden="true"></i>
        </section>
        <p className="form-p" style={{ fontWeight: 'bold' }}> Login </p>
        <p className="form-p1"> Login to shop for cool T-shirt</p>
        <div className="className-input">
          <input type="email" className="form-input" placeholder="Email" required onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="className-input" id="form-pass">
          <input type={toggle ? 'text':'password'} className="form-input" placeholder="Password" required onChange={(e)=>setPassword(e.target.value)}/>
          <main className="pass-toggle" onClick={handleToggle}>
          {toggle? (
              <i className="fa-solid fa-eye"></i>
            ) : (
              <i className="fa-solid fa-eye-slash"></i>
            )}
            
          </main>
        </div>
        <div className="className-input">
          <main className="form-check1">
            <span className="check-box">
              <input type="checkbox" style={{ height: '2rem', width: '2rem' }} onClick={()=>setKeepSignIn(true)}/>
              <span style={{ marginLeft: '.5rem' }}>Keep me signed in</span>
            </span>
            <p style={{ fontSize: '1.5rem', color: '#808080' }}>Forget Password?</p>
          </main>
        </div>
        <div className="className-input">
          <button className="form-btn">Sign In</button>
        </div>
        <div className="className-input">
          <main className="form-check1" style={{ width: '25rem' }}>
            <p style={{ fontSize: '1.8rem' }}>Not a member yet ?</p>
            <p style={{ fontSize: '1.8rem' }}><Link to={'/signup'} style={{'color':'black','textDecoration':'none','fontWeight':'bold'}}>Sign Up</Link></p>
          </main>
        </div>
      </form>
    </div>
  );
}

export default SignIn
