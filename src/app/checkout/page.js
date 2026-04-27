'use client';
import { useState, useEffect } from 'react';

import Header from '../../components/header';

export default function Page() {

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  
  useEffect(() => {

    const username = localStorage.getItem("email");

    fetch('/api/getCart?username=' + username)
      .then((res) => res.json())
      .then((data) => {

        setCart(data);

        let sum = 0;

        for (let i = 0; i < data.length; i++) {
          sum = sum + Number(data[i].price);
        }

        setTotal(sum);
      });

  }, []);
  
  function checkout() {
    const username = localStorage.getItem("email");

    fetch('/api/checkout?username=' + username)
      .then((res) => res.json())
      .then((data) => {
        alert("Order placed! Total: " + data.total);
        window.location.href = "/dashboard";
      });
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>

      <Header />

      <h1>Checkout</h1>

      <div>
        {
          cart.map((item, i) => (
            <div key={i}>
              {item.pname} - {"\u20AC"}{item.price}
            </div>
          ))
        }
      </div>

      <h2>Total: {"\u20AC"}{total}</h2>

      <button onClick={checkout}>
        Confirm Order
      </button>

    </div>
  );
}