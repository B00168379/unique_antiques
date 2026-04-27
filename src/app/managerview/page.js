'use client';
import { useState, useEffect } from 'react';

// Import header
import Header from '../../components/managerheader';

export default function Page() {

  const [data, setData] = useState(null);

  useEffect(() => {

    const acctype = localStorage.getItem("acctype");

    // redirect if not manager
    if (acctype !== "manager") {
      window.location.href = "/login";
      return;
    }

    //  send acctype to API
    fetch('/api/getManagerData?acctype=' + acctype)
      .then((res) => res.json())
      .then((data) => {

        // extra safety check
        if (data.error) {
          window.location.href = "/login";
          return;
        }

        setData(data);
      });

  }, []);

  if (!data) return <p>Loading</p>;

  return (
    <div style={{ padding: '20px' }}>

      {/* header */}
      <Header />

      <h1>Manager View</h1>

      <h2>Total Orders: {data.totalOrders}</h2>
      <h2>Total Cost: {"\u20AC"}{data.totalCost}</h2>

      <h3>Orders</h3>

      {
        data.orders.map((order, i) => (
          <div 
            key={i} 
            style={{
              padding: '15px',
              border: '1px solid gray',
              marginBottom: '10px'
            }}
          >
            <p>Order ID: {order._id}</p>
            <p>Total: {"\u20AC"}{order.total}</p>
          </div>
        ))
      }

    </div>
  );
}