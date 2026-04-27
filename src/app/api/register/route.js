//api/register

//import MongoDB
import { MongoClient } from 'mongodb';

export async function GET(req, res) {

  // show message in terminal when API runs
  console.log("in the register api page")

  //get user details from URL
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')
  const pass = searchParams.get('pass')
  const dob = searchParams.get('dob')

  // get user type manager o customer
  const acctype = searchParams.get('acctype')

  console.log(email);
  console.log(pass);
  console.log(dob);
  console.log(acctype);

  
  // using MongoDB Atlas from .env
  const url = process.env.MONGODB_URI;
  const client = new MongoClient(url);
  const dbName = 'app';

  // connect to DB
  await client.connect();
  console.log('Connected successfully to server');
 
  //select DB and collection
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

  // send response to frontend
  return Response.json({ "data": "user inserted" });
}