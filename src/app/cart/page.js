// app/cart
'use client';
// React imported and UI components
import * as React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { useState, useEffect } from 'react';

import Header from '../../components/header';

export default function Page() {

  // state to store cart data
  const [data, setData] = useState(null);

  // run when page loads
  useEffect(() => {
    //get user logged from localStorage
    const username = localStorage.getItem("email");

    //fetch cart items for the user
    fetch('/api/getCart?username=' + username)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
 
  /*need review to see why is not working*/
  // function to remove item from cart 
  function removeItem(id) {
    fetch("/api/removeFromCart?id=" + id)
      .then(() => {
        // update when removing item from state
        setData(data.filter((item) => item._id !== id));
      });
  }

  if (!data) return <p>Loading</p>;

  // create theme from material UI
  const theme = createTheme({
    palette: {
      secondary: {
        main: green[500],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>

      <Header />

      <Container component="main" maxWidth="xs">
         
        <div style={{ fontSize: '40px' }}> Shopping Cart</div>
 
        {/* display cart items */}
        <div>
          {
            data.map((item, i) => (
              <div style={{ padding: '20px' }} key={i}>
               <img
                 src={item.image}
                 alt={item.pname}
                 style={{
                    width: "180px",
                    height: "140px",
                    objectFit: "cover",
                    borderRadius: "8px",
                   marginBottom: "10px"
                        }}
              />
               <br />
                Unique ID: {item._id}
                <br />
                Product: {item.pname}
                <br />
                Price: {"\u20AC"}{item.price}
                <br />
                User: {item.username}
                <br />
                 {/* remove button */}
                <Button 
                  onClick={() => removeItem(item._id)} 
                  variant="outlined"
                >
                  Remove
                </Button>

              </div>
            ))
          }
        </div>

        {/* send to checkout page */}
        <Button 
          href="/checkout"
          variant="contained"
          style={{ marginTop: '20px' }}
        >
          Submit Order
        </Button>

      </Container>
    </ThemeProvider>
  );
}