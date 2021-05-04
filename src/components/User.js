import { Route, Link, useRouteMatch } from 'react-router-dom';
import Order from './User/Order';
import Settings from './User/Settings';

function User({ token }) {
    const { path, url } = useRouteMatch();

    return (
        <div className="User">
            <h2>Dashboard</h2>
            <div className="User__div-dashboard">
                <div className="User__div-nav">
                    <nav>
                        <ul>
                            <li><Link to={`${url}/order`}>Order</Link></li>
                            <li><Link to={`${url}/settings`}>Settings</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className="User__div-viewport">
                    <Route path={`${path}/order`} render={ () => {
                        return <Order token={token} />
                    }}/>
                    <Route path={`${path}/settings`} component={Settings} />
                </div>
            </div>
        </div>
    );
}

export default User;