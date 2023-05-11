import { MongoClient } from "mongodb";

export async function connectDatabase() {
  return await MongoClient.connect(
    // newsletter will be the name of the database
    "mongodb+srv://mark05:A6815869193@project1.sbdoj8d.mongodb.net/events?retryWrites=true&w=majority"
  );
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  // newletter is the name of the collection
  const response = await db.collection(collection).insertOne(document);
  console.log(response);
}

export async function getAllDocuments(client, collection, sort, filter) {
  const db = client.db();
  return await db.collection(collection).find(filter).sort(sort).toArray();
}
