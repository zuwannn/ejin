import React, { useState } from 'react';
// import firebase from 'firebase/app';
import { auth } from '../config/firebase'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('')


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        await signInWithEmailAndPassword(auth, email, password)
        navigate('/ejin/dashboard');

    } catch (error) {
        console.log(error);
        setErrorMessage(error.message)
    }
  }
  console.log(import.meta.env.REACT_APP_BASE);
  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="container">
        <div>
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            name="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>


        <button className='btn btn-primary' type="submit">Login</button>
      </div>

      <hr></hr>
        <a href="/register">Register?</a>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>

  )
}

export default Login