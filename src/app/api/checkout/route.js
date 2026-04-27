//api/checkout
export async function GET(req) {

  // show message in terminal when this API runs
  console.log("in checkout api page");

  // get username from the URL
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  // import MongoDB
  const { MongoClient } = require('mongodb');

  // MongoDB connection URL, original link saved in .env
  
  const url = process.env.MONGODB_URI;
  const client = new MongoClient(url);

  // connect to MongoDB
  await client.connect();

  // select database
  const db = client.db('app');

  // get cart items for the logged in user
  const cart = await db.collection('shopping_cart').find({
    username: username
  }).toArray();

  // variable to store total price
  let total = 0;

  // calculate total price of cart
  for (let i = 0; i < cart.length; i++) {
    total = total + Number(cart[i].price);
  }

  // create order object
  const order = {
    username: username,
    items: cart,
    total: total
  };

  // save order in orders collection
  await db.collection('orders').insertOne(order);

  // clear cart for this user after order is placed
  await db.collection('shopping_cart').deleteMany({
    username: username
  });

  // close MongoDB connection
  await client.close();

  // message display
  return Response.json({
    data: "order placed",
    total: total
  });
}