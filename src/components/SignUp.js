import {
    Link
} from 'react-router-dom';
import { useState } from 'react';

function SignUp({ setToken }) {
    const [ nameFirst, setNameFirst ] = useState('');
    const [ nameLast, setNameLast ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const createUser = async () => {
        try {
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nameFirst, nameLast, email, password }),
            });

            if(!response.ok) {
                console.error('bad user signup');
            }
            
            const data = await response.json();
            const { access_token } = data;

            setToken(access_token);
        } catch(err) {
            console.error(err);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        createUser();
    };

    return (
        <div className="SignUp">
            <form onSubmit={submitHandler}>
                <h2>Sign Up</h2>
                <div className="SignUp__div-input">
                    <label htmlFor="nameFirst">First Name</label>
                    <input type="text" id="nameFirst" onChange={ (e) => { setNameFirst(e.target.value) } } value={nameFirst} required />
                </div>

                <div className="SignUp__div-input">
                    <label htmlFor="nameLast">Last Name</label>
                    <input type="text" id="nameLast" onChange={(e) => { setNameLast(e.target.value) }} value={nameLast} required />
                </div>

                <div className="SignUp__div-input">
                    <label htmlFor="email">Email: </label>
                    <input id="email" type="email" onChange={(e) => { setEmail(e.target.value) }} value={email} required />
                </div>

                <div className="SignUp__div-input">
                    <label htmlFor="password">Password: </label>
                    <input id="password" type="password" onChange={(e) => { setPassword(e.target.value) }} value={password} required />
                </div>

                <button type="submit">Submit</button>
                <span className="SignUp__span-signup">Already a user? Log in <Link to="/login">here</Link>.</span>
            </form>
        </div>
    );
}

export default SignUp;