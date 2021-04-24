import { useState } from 'react';

function SignUp() {
    const [ nameFirst, setNameFirst ] = useState('');
    const [ nameLast, setNameLast ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const postUser = async () => {
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nameFirst, nameLast, email, password }),
            });

            if(!response.ok) {
                console.error('bad user signup');
            }
            
            console.log( await response.json() );

        } catch(err) {
            console.error(err);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        postUser();
    };

    return (
        <div className="SignUp">
            <h2>SignUp</h2>
            <form onSubmit={submitHandler}>
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
            </form>
        </div>
    );
}

export default SignUp;