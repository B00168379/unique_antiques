//api/getCart

//import MongoDB
import { MongoClient } from 'mongodb';

export async function GET(req) {
  
  // show message in terminal when this API runs
  console.log("in the getCart api page");

  // get username from the URL
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');


  // MongoDB connection URL saved on .env
  const url = process.env.MONGODB_URI;
  const client = new MongoClient(url);

  //connect to MongoDB
  await client.connect();
 
  //select database and collection 
  const db = client.db('app');
  const collection = db.collection('shopping_cart');

  //get items for this user from cart
  const findResult = await collection.find({
    username: username
  }).toArray();

  await client.close();
  
  // return message
  return Response.json(findResult);
}