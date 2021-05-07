import { useEffect, useState } from 'react';

function Order({ token }) {
    const [order, setOrder] = useState(undefined);
    
    const getOrders = async () => {
        try {
            const response = await fetch(`${window.location.origin}/api/orders/orderinfo`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if(!response.ok) {
                console.error('bad order fetch');
                setOrder(undefined);
            }

            const orderData = await response.json();
            setOrder(orderData);

        } catch(err) {
            console.error(err);
        }
        
    };
    
    useEffect( () => {
        getOrders();
    }, []);


    const displayOrder = (order) => {
        return (
            <div className="Order__div-container">
                {order.items.map( (item) => {
                    return (
                    <div className="Order__div-card">
                        <h4>{item.name}</h4>
                        <p>Description: {item.description}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Cost: {item.quantity*item.price}</p>
                        <p>Notes: {item.note}</p>
                    </div>
                    );
                })}
            </div>
        );
    }

    return (
        <div className="Order">
            <h2>Order</h2>
            { order ? displayOrder(order[0]) : null }
        </div>
    );
}

export default Order;