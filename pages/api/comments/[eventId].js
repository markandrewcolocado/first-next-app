import { MongoClient } from "mongodb";

async function handler(req, res) {
  const eventId = req.query.eventId;

  // Connect to MongoDB
  const client = await MongoClient.connect(
    // newsletter will be the name of the database
    "mongodb+srv://mark05:A6815869193@project1.sbdoj8d.mongodb.net/events?retryWrites=true&w=majority"
  );

  if (req.method === "POST") {
    const email = req.body.email;
    const name = req.body.name;
    const text = req.body.text;
    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const db = client.db();
    const result = await db.collection("comments").insertOne(newComment);
    newComment.id = result.insertedId;

    console.log(result);

    res.status(201).json({ message: "Added comment.", comment: newComment });
  }

  if (req.method === "GET") {
    const db = client.db();
    const documents = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({ comments: documents });
  }

  client.close();
}

export default handler;
