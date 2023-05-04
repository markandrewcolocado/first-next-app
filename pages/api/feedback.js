import fs from "fs";
import path from "path";

function buildFeedbackPath() {
  return path.join(process.cwd(), "data", "feedback.json");
}

function extractFeedbackData(filePath) {
  const fileData = fs.readFileSync(filePath);
  let data = [];
  // check if the file has no data in it before parsing to avoid Unexpected end of JSON file error
  if (fileData.length !== 0) {
    data = JSON.parse(fileData);
  }
  return data;
}

function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const feedbackText = req.body.text;

    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      text: feedbackText,
    };

    // store the data in a database or in a file
    const filePath = buildFeedbackPath();
    const data = extractFeedbackData(filePath);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    return res.status(201).json({ message: "Success!", feedback: newFeedback });
  }
  const filePath = buildFeedbackPath();
  const data = extractFeedbackData(filePath);
  res.status(200).json({ feedback: data });
}

export default handler;
