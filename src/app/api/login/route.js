// api/login

//import MongoDB
import { MongoClient } from 'mongodb';

export async function GET(req, res) {

  // show message in terminal when API runs
  console.log("in the api page");

  // get email and password from URL
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const pass = searchParams.get('pass');

  console.log(email);
  console.log(pass);


  // MongoDB connection from .env
  const url = process.env.MONGODB_URI;
  const client = new MongoClient(url);

  const dbName = 'app';

  // connect to database
  await client.connect();
  console.log('Connected successfully to server');

  // select database and collection
  const db = client.db(dbName);
  const collection = db.collection('login');

  // check if user exists with matching email and password
  const findResult = await collection.find({
    username: email,
    pass: pass
  }).toArray();

  // variables to store login result
  let valid = false;
  let acctype = "";

  // if user found, login is valid
  if (findResult.length > 0) {
    valid = true;

    // get account type, manager or customer
    acctype = findResult[0].acctype;

    console.log("login valid");
  } else {
    valid = false;
    console.log("login invalid");
  }

  // send login result to frontend
  return Response.json({
    data: "" + valid + "",
    acctype: acctype
  });
}