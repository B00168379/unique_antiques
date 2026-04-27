// This test checks if the item is added to the cart

function testAddToCart() {

  // create empty cart
  let cart = [];

  // create a product
  const product = {
    pname: "grinder",
    price: 299
  };

  // add product to cart
  cart.push(product);

  // check if cart has 1 item
  if (cart.length === 1) {
    console.log("PASS: Item added to cart");
  } else {
    console.log("FAIL: Item not added");
  }

}

// run the test
testAddToCart();