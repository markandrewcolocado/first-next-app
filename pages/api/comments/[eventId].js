import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "../../../helpers/db-util";

async function handler(req, res) {
  const eventId = req.query.eventId;
  let client;

  try {
    // Connect to MongoDB
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Cannot connect to the database!" });
    return;
  }

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
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    try {
      const result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;
      console.log(result);
      res.status(201).json({ message: "Added comment.", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Adding comment failed." });
    }
  }

  if (req.method === "GET") {
    // const db = client.db();
    let documents;
    try {
      documents = await getAllDocuments(client, "comments", { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Error in fetching comments." });
    }
  }

  // Don't forget to close the Mongodb connection
  client.close();
}

export default handler;
