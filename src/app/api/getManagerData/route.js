//api/getManagerData
export async function GET(req) {

  console.log("in manager api page");

  // GET user type from URL
  const { searchParams } = new URL(req.url);
  const acctype = searchParams.get('acctype');

  // basic security check to access data only for managers
  if (acctype !== "manager") {
    return Response.json({ error: "Unauthorized" });
  }

  // import MongoDB
  const { MongoClient } = require('mongodb');
  
  // connection from .env
  const url = process.env.MONGODB_URI;
  const client = new MongoClient(url);

  const dbName = 'app';

  // connect to DB
  await client.connect();
  
  // select DB and collection 
  const db = client.db(dbName);
  const collection = db.collection('orders');
  
  // get orders from DB
  const orders = await collection.find({}).toArray();

  // var to store total cost
  let totalCost = 0;

  // calculate total cost of the orders
  for (let i = 0; i < orders.length; i++) {
    totalCost = totalCost + Number(orders[i].total);
  }

  // count total number of orders
  let totalOrders = orders.length;

  // close DB connection
  await client.close();

  // return message to frontend
  return Response.json({
    totalOrders: totalOrders,
    totalCost: totalCost,
    orders: orders
  });
}