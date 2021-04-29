function User() {
    return (
        <div className="User">
            <h2>Order Dashboard</h2>
            <div className="User__div-dashboard">
                <div className="User__div-nav">
                    <nav>
                        <ul>
                            <li><button id="order">Order</button></li>
                            <li><button id="settings">Settings</button></li>
                        </ul>
                    </nav>
                </div>
                <div className="User__div-viewport">

                </div>
            </div>
        </div>
    );
}

export default User;