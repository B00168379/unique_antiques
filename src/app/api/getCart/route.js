export async function GET(req) {

  console.log("in the getCart api page");

  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  const { MongoClient } = require('mongodb');

  const url = process.env.MONGODB_URI;
  const client = new MongoClient(url);

  await client.connect();

  const db = client.db('app');
  const collection = db.collection('shopping_cart');

  const findResult = await collection.find({
    username: username
  }).toArray();

  await client.close();

  return Response.json(findResult);
}