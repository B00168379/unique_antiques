export async function GET(req, res) {

  console.log("in the api page")

  const { MongoClient } = require('mongodb');

  // use environment variable
  const url = process.env.MONGODB_URI;

  const client = new MongoClient(url);

  const dbName = 'app';

  await client.connect();
  console.log('Connected successfully to server');

  const db = client.db(dbName);
  const collection = db.collection('products');

  const findResult = await collection.find({}).toArray();
  console.log('Found documents =>', findResult);

  await client.close();

  return Response.json(findResult)
}