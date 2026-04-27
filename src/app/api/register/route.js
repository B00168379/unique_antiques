export async function GET(req, res) {

  console.log("in the register api page")

  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')
  const pass = searchParams.get('pass')
  const dob = searchParams.get('dob')

  // get user type (customer or manager)
  const acctype = searchParams.get('acctype')

  console.log(email);
  console.log(pass);
  console.log(dob);
  console.log(acctype);

  const { MongoClient } = require('mongodb');
  
  // using MongoDB Atlas
  const url = process.env.MONGODB_URI;
  const client = new MongoClient(url);
  const dbName = 'app';

  await client.connect();
  console.log('Connected successfully to server');

  const db = client.db(dbName);
  const collection = db.collection('login');

  // insert new user into database
  await collection.insertOne({
    "username": email,
    "pass": pass,
    "dob": dob,
    "acctype": acctype // added acc type
  });

  console.log("user inserted");

  return Response.json({ "data": "user inserted" });
}