import {
    Link
} from 'react-router-dom';

function Home() {
        return (
            <div className="Home">
                <h2>Home</h2>
                <ul>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/signup">Sign Up</Link>
                    </li>
                </ul>

            </div>
        );
}

export default Home;