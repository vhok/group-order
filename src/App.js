import './styles/styles.scss';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Admin from './components/Admin';
import User from './components/User';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

function App() {
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

          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/admin" component={Admin} />
          <Route path="/user" component={User} />
        </main>

        {/* ================ FOOTER ================ */}
        <footer>
        </footer>
      </div>
    </Router>
  );
}

export default App;
