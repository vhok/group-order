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


    return (
        <div className="Order">
            <h2>Order</h2>
        </div>
    );
}

export default Order;