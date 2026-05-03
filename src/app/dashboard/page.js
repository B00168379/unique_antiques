//app/dashboard
'use client';
// import React and Material UI componets
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

  // Function to add items into the shopping cart
  function putInCart(pname, price, image) {
  const username = localStorage.getItem("email");

  // send product details to the cart API
  fetch(
    "/api/putInCart?pname=" + pname +
    "&price=" + price +
    "&image=" + image +
    "&username=" + username
  );
}

  // state for products
  const [data, setData] = useState(null);

  // state for weather
  const [weather, setWeatherData] = useState(0);
  
   // run when page loads
  useEffect(() => {

    // Get products from DB
    fetch('/api/getProducts')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });

    // Get weather from APi
    fetch('/api/getWeather')
      .then((res) => res.json())
      .then((weather) => {
        setWeatherData(weather);
      });

  }, []);

  // show loading messages while data is loading
  if (!data) return <p>Loading</p>;
  if (!weather) return <p>No weather</p>;

    // create Material UI theme
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

       {/* display products */}
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
                {item.pname} - {"\u20AC"}{item.price}
                <br />
                
                {/* button to add product to cart */}
                <Button
                  onClick={() => putInCart(item.pname,item.price,item.image)}
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