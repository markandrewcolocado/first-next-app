import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address!" });
      return;
    }

    const client = await MongoClient.connect(
      // newsletter will be the name of the database
      "mongodb+srv://mark05:A6815869193@project1.sbdoj8d.mongodb.net/newsletter?retryWrites=true&w=majority"
    );
    const db = client.db();
    // emails is the name of the collection
    const response = await db
      .collection("emails")
      .insertOne({ email: userEmail });
    console.log(response);

    client.close();

    res.status(201).json({ message: "Success!", email: userEmail });
  }
}

export default handler;
