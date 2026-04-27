//app/managerview 
'use client';
// import React hooks
import { useState, useEffect } from 'react';

// Import header
import Header from '../../components/managerheader';

export default function Page() {

  // state to store manager data
  const [data, setData] = useState(null);

  // run when page loads
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
        
        // store manager data
        setData(data);
      });

  }, []);
  
  //show wile loading
  if (!data) return <p>Loading</p>;

  return (
    <div style={{ padding: '20px' }}>

      {/* header */}
      <Header />

      <h1>Manager View</h1>

      <h2>Total Orders: {data.totalOrders}</h2>
      {/* display total orders */}
      <h2>Total Cost: {"\u20AC"}{data.totalCost}</h2>

      {/* display total cost using euro symbol */}
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