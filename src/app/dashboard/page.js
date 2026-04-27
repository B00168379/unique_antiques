'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { useState, useEffect } from 'react';

// Import header
import Header from '../../components/header';

export default function Page() {

  // Function for putting items into the shopping cart
  function putInCart(pname, price) {
  const username = localStorage.getItem("email");

  fetch(
    "/api/putInCart?pname=" + pname +
    "&price=" + price +
    "&username=" + username
  );
}

  // state for products
  const [data, setData] = useState(null);

  // state for weather
  const [weather, setWeatherData] = useState(0);

  useEffect(() => {

    // Get products
    fetch('/api/getProducts')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });

    // Get weather
    fetch('/api/getWeather')
      .then((res) => res.json())
      .then((weather) => {
        setWeatherData(weather);
      });

  }, []);

  if (!data) return <p>Loading</p>;
  if (!weather) return <p>No weather</p>;

  const theme = createTheme({
    palette: {
      secondary: {
        main: green[500],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>

      {/* header */}
      <Header />

      {/* Weather */}
      <div style={{ padding: '10px', fontWeight: 'bold' }}>
        Today's temperature: {JSON.stringify(weather.temp)}
      </div>

      <Container component="main" maxWidth="xs">

        <div style={{ fontSize: '40px' }}>List Of Products</div>

        <div>
          {
            data.map((item, i) => (
              <div style={{ padding: '20px' }} key={i}>
                Unique ID: {item._id}
                <br />
                {item.pname} - {"\u20AC"}{item.price}
                <br />

                <Button
                  onClick={() => putInCart(item.pname,item.price)}
                  variant="outlined"
                >
                  Add to cart
                </Button>

              </div>
            ))
          }
        </div>

      </Container>

    </ThemeProvider>
  );
}