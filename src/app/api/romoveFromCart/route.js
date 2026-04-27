import { MongoClient, ObjectId } from 'mongodb';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  const url = process.env.MONGODB_URI;
  const client = new MongoClient(url);

  await client.connect();

  const db = client.db('app');
  const collection = db.collection('shopping_cart');

  await collection.deleteOne({ _id: new ObjectId(id) });

  await client.close();

  return Response.json({ data: "deleted" });
}