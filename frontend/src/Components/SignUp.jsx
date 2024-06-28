import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { API } from '../Api';


const SignUP = () => {
  const [user_name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('users/signup/', { user_name, email, password });
      console.log(response.data);
      alert(`Registered successsfully`)
      navigate('/signin')
    } catch (err) {
      console.log(err);
      alert('Please provide valid Email')
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <>
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <section className="form-cancel" onClick={handleCancel}>
          <i className="fa fa-times" aria-hidden="true"></i>
        </section>
        <p className="form-p">
          Create an account and <br /> discover the benefits
        </p>
        <p className="form-p1">COOL TEES</p>
        <div className="className-input">
          <input
            type="text"
            className="form-input"
            placeholder="User Name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="className-input">
          <input
            type="email"
            className="form-input"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="className-input">
          <input
            type="password"
            className="form-input"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="className-input">
          <main className="form-check">
            <input type="checkbox" style={{ height: '2rem', width: '2rem' }} required />
            <p style={{ fontSize: '1.5rem', textAlign: 'left', width: '70%' }}>
              I agree to the Google Terms of Service and Privacy Policy
            </p>
          </main>
        </div>
        <div className="className-input">
          <button className="form-btn">Submit</button>
        </div>
        <p className="form-p2">
          Are you already a member? <Link to={'/signin'}>Sign In</Link>
        </p>
        <p className="form-a"></p>
      </form>
    </div></>
  );
};

export default SignUP;
