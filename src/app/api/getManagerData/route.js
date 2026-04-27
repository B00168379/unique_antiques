export async function GET(req) {

  console.log("in manager api page");

  // GET user type from URL
  const { searchParams } = new URL(req.url);
  const acctype = searchParams.get('acctype');

  // basic security check
  if (acctype !== "manager") {
    return Response.json({ error: "Unauthorized" });
  }

  const { MongoClient } = require('mongodb');

  const url = process.env.MONGODB_URI;

  const client = new MongoClient(url);
  const dbName = 'app';

  await client.connect();

  const db = client.db(dbName);
  const collection = db.collection('orders');

  const orders = await collection.find({}).toArray();

  let totalCost = 0;

  // calculate total cost
  for (let i = 0; i < orders.length; i++) {
    totalCost = totalCost + Number(orders[i].total);
  }

  let totalOrders = orders.length;

  await client.close();

  return Response.json({
    totalOrders: totalOrders,
    totalCost: totalCost,
    orders: orders
  });
}