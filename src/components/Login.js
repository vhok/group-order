function Login() {
    return (
        <div className="Login">
            <h2>Login</h2>
            <form>
                <div className="Login__div-input">
                    <label htmlFor="email">Email: </label>
                    <input id="email" type="text"/>
                </div>

                <div className="Login__div-input">
                    <label htmlFor="password">Password: </label>
                    <input id="password" type="text"/>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Login;