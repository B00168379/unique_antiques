//api/getProducts

export async function GET(req, res) {

  // show message in terminal when API runs
  console.log("in the api page")

  // import MongoDB
  const { MongoClient } = require('mongodb');

  // connection from .env
  const url = process.env.MONGODB_URI;
  const client = new MongoClient(url);

  const dbName = 'app';

  // connect to DB
  await client.connect();
  console.log('Connected successfully to server');
 
  //select database and collection
  const db = client.db(dbName);
  const collection = db.collection('products');

  // get all products from DB 
  const findResult = await collection.find({}).toArray();
  console.log('Found documents =>', findResult);

  // close database
  await client.close();

  //send data to frontend
  return Response.json(findResult)
}