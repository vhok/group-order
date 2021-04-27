import './styles/styles.scss';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import User from './components/User';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [ user, setUser ] = useState(undefined);
  const [ token, setToken ] = useState(undefined);
  
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch('/api/users/userinfo', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.error('bad user fetch');
          setUser(undefined);
        }

        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        console.error(err);
      }
    }

    if (token) {
      getUser();
    }
  }, [token]);

  return (
    <Router>
      <div className="App wrapper">
        {/* ================ HEADER ================ */}
        <header>
        </header>

        {/* ================ MAIN ================ */}
        <main>
          <h1>My App</h1>

          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>

          <Route exact path="/" component={Home} />

          <Route path="/login" render={() => {
            if (user) {
              return <Redirect to="/user" />;
            }
            return <Login setToken={setToken} />;
          }} />
          
          <Route path="/signup" render={() => {
            if (user) {
              return <Redirect to="/user" />;
            }
            return <SignUp setToken={setToken} />;
          }} />

          <Route path="/user" render={() => {
            if (user) {
              return <User />;
            }
            return <Redirect to="/" />;
          }} />
        </main>

        {/* ================ FOOTER ================ */}
        <footer>
        </footer>
      </div>
    </Router>
  );
}

export default App;
