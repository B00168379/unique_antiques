//api/putInCart

//import MongoDB
import { MongoClient } from 'mongodb';

export async function GET(req) {

  // show message in terminal when API runs
  console.log("in the putInCart api page");

  //get product, price and user from URL
  const { searchParams } = new URL(req.url);

  const pname = searchParams.get('pname');
  const price = searchParams.get('price');
  const image = searchParams.get('image');
  const username = searchParams.get('username');

  //connection from .env
  const url = process.env.MONGODB_URI;
  const client = new MongoClient(url);

  //connect to DB
  await client.connect();

  // select DB and collection 
  const db = client.db('app');
  const collection = db.collection('shopping_cart');

  // create object for cart item
  const myobj = {
    pname: pname,
    price: price,
    image: image,
    username: username
  };

  //insert item in cart collection
  await collection.insertOne(myobj);

  // close DB connection
  await client.close();

  // return response to frontend
  return Response.json({ data: "inserted" });
}