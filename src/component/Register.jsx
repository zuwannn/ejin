import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    registerWithEmailAndPassword, testButton,
} from '../config/firebase';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setName] = useState("");

    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await registerWithEmailAndPassword(username, email, password)
            navigate('/ejin/login');

        } catch (error) {
            console.log(error);
            setErrorMessage(error.message)
        }
    }

    const handleLogin = () => {
        navigate('/ejin/login');
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2>Register</h2>
            <div className="container ">

                <div className='d-flex m-3'>
                    <label htmlFor="username" className='form-label mx-3 col-3'>Username</label>
                    <input className='form-control' onChange={(e) => setName(e.target.value)} type="text" name="username" value={username} />
                </div>

                <div className='d-flex m-3'>
                    <label htmlFor="email" className='form-label mx-3 col-3'>Email</label>
                    <input className='form-control' onChange={(e) => setEmail(e.target.value)} type="email" name="email" value={email} required />
                </div>

                <div className='d-flex m-3'>
                    <label htmlFor="password" className='form-label mx-3 col-3'>Password</label>
                    <input className='form-control' onChange={(e) => setPassword(e.target.value)} type="password" name="password" value={password} required />
                </div>

                <button className='btn btn-primary col-4' type="submit">Register</button>
            </div>
            <hr />
            <button type='button' className='btn btn-btn-outline-secondary' onClick={handleLogin} >Login?</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>

    )
}

export default Register
