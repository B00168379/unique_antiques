// This test to checks if checkout total is calculated correctly

function testCheckout() {

  // cart with 2 products
  const cart = [
    { pname: "grinder", price: 299 },
    { pname: "telephone", price: 325 }
  ];

  let total = 0;

  // calculate total price
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price;
  }

  // check if total is correct
  if (total === 150) {
    console.log("PASS: Checkout total is correct");
  } else {
    console.log("FAIL: Checkout total is incorrect");
  }

}

// run the test
testCheckout();