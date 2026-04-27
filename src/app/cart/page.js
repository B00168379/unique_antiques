'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { useState, useEffect } from 'react';

import Header from '../../components/header';

export default function Page() {

  const [data, setData] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("email");

    fetch('/api/getCart?username=' + username)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  function removeItem(id) {
    fetch("/api/removeFromCart?id=" + id)
      .then(() => {
        setData(data.filter((item) => item._id !== id));
      });
  }

  if (!data) return <p>Loading</p>;

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

        <div>
          {
            data.map((item, i) => (
              <div style={{ padding: '20px' }} key={i}>
                Unique ID: {item._id}
                <br />
                Product: {item.pname}
                <br />
                Price: {"\u20AC"}{item.price}
                <br />
                User: {item.username}
                <br />

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