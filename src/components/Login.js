import {
    Link
} from 'react-router-dom';
import { useState } from 'react';

function Login({ setToken }) {
    const [ email , setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const loginUser = async () => {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                console.error('invalid login');
            }

            const data = await response.json();
            const { access_token } = data;

            setToken(access_token);
        } catch (err) {
            console.error(err);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        loginUser();
    };

    return (
        <div className="Login">
            <h2>Login</h2>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/signup">Sign Up</Link>
                </li>
            </ul>
            <form onSubmit={submitHandler}>
                <div className="Login__div-input">
                    <label htmlFor="email">Email: </label>
                    <input id="email" type="email" onChange={(e) => { setEmail(e.target.value) }} value={email} required/>
                </div>

                <div className="Login__div-input">
                    <label htmlFor="password">Password: </label>
                    <input id="password" type="password" onChange={(e) => { setPassword(e.target.value) }} value={password} required/>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Login;