//app/checkout
'use client';
// import react hooks
import { useState, useEffect } from 'react';

import Header from '../../components/header';

export default function Page() {

    // state to store cart items and total price
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  
  // run when page loads
  useEffect(() => {

    // get the user logged in from localStorage
    const username = localStorage.getItem("email");

    // fetch cart items for the user
    fetch('/api/getCart?username=' + username)
      .then((res) => res.json())
      .then((data) => {

        // store cart items in state
        setCart(data);

        // calculate total price
        let sum = 0;

        for (let i = 0; i < data.length; i++) {
          sum = sum + Number(data[i].price);
        }

        // uldate total state
        setTotal(sum);
      });

  }, []);
  
  // function checkout to confirm order
  function checkout() {
    const username = localStorage.getItem("email");

    // call checkout API
    fetch('/api/checkout?username=' + username)
      .then((res) => res.json())
      .then((data) => {
        alert("Order placed! Total: " + data.total);
        // redirect the user to dashboard after confirmation
        window.location.href = "/dashboard";
      });
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>

      <Header />

      <h1>Checkout</h1>

       {/* display cart items */}
      <div>
        {
          cart.map((item, i) => (
            <div key={i}>
              {item.pname} - {"\u20AC"}{item.price}    {/* used euro symbol */}
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