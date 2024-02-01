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

    const handleTestButton = () => {
        testButton()
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2>Register</h2>
            <div className="container ">

                <div>
                    <label htmlFor="username">Username</label>
                    <input onChange={(e) => setName(e.target.value)} type="text" name="username" value={username} />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" value={email} required />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" value={password} required />
                </div>

                <button className='btn btn-primary' type="submit">Register</button>
            </div>
            <hr />
            <button type='button' className='btn btn-outline-info' onClick={handleTestButton} >Test Button</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>

    )
}

export default Register
