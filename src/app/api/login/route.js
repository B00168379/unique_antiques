export async function GET(req, res) {

  console.log("in the api page")

  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')
  const pass = searchParams.get('pass')

  console.log(email);
  console.log(pass);

  const { MongoClient } = require('mongodb');

  // using MongoDB Atlas, login details in .env.local
  
  const url = process.env.MONGODB_URI;
  const client = new MongoClient(url);
  const dbName = 'app';

  await client.connect();
  console.log('Connected successfully to server');

  const db = client.db(dbName);
  const collection = db.collection('login');

  const findResult = await collection.find({
    "username": email,
    "pass": pass
  }).toArray();

  let valid = false;
  let acctype = "";

  if (findResult.length > 0) {
    valid = true;

    // get account type from database
    acctype = findResult[0].acctype;

    console.log("login valid");
  } else {
    valid = false;
    console.log("login invalid");
  }

  return Response.json({
    "data": "" + valid + "",
    "acctype": acctype
  });
}