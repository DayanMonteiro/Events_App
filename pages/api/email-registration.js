import path from "path";
import fs from "fs";

function buildPath() {
  return path.join(process.cwd(), "data", "data.json");
}

export default function handler(req, res) {
  const { method } = req;

  /*
   -> Access our data 
   -> extract ou Data (AllEvents) in data.json 
   -> if error res 404 if there are no AllEvents
   -> if success - AllEvents - loop through them and identify the EventID 
      - add the email into emails_registered 
        - only if that email doesn't exist 
  -> check the format of the email is OK

  */
  if (method === "POST") {
    const { email, eventId } = req.body;

    res.status(200).json({
      message: `You has been registered successfully with the email: ${email} ${eventId}`,
    });
  }
}
