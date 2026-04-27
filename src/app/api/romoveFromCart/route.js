//api/removeFromCart

// import MongoDB and ObjectID to select the correct item
import { MongoClient, ObjectId } from 'mongodb';

export async function GET(req) {

  /*I think is a problem here, for that reason checkout doesn't refresh when deleting an item*/
  // get item Id from URL    
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  // get connection from .env
  const url = process.env.MONGODB_URI;
  const client = new MongoClient(url);

  // connect to DB
  await client.connect();

  // select DB and collection
  const db = client.db('app');
  const collection = db.collection('shopping_cart');

  /* some problem should be here*/
  // detele item from cart using ID
  await collection.deleteOne({ _id: new ObjectId(id) });

  // close DB connection
  await client.close();

  // send confirmation to frontend
  return Response.json({ data: "deleted" });
}