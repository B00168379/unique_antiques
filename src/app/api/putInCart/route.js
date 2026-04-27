export async function GET(req) {

  console.log("in the putInCart api page");

  const { searchParams } = new URL(req.url);

  const pname = searchParams.get('pname');
  const price = searchParams.get('price');
  const username = searchParams.get('username');

  const { MongoClient } = require('mongodb');

  const url = process.env.MONGODB_URI;
  const client = new MongoClient(url);

  await client.connect();

  const db = client.db('app');
  const collection = db.collection('shopping_cart');

  const myobj = {
    pname: pname,
    price: price,
    username: username
  };

  await collection.insertOne(myobj);

  await client.close();

  return Response.json({ data: "inserted" });
}