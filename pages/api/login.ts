import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

type Data = {
  token: string;
};

const KEY = "ahdsahdkadadkadksadadkhasdads";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (!req.body) {
    res.statusCode = 404;
    res.end("Error");
    return;
  }
  const { email, password } = req.body;
  // Check if user exists in db
  // Then fetch name, id of user and put in jwt
  const userDetails = { email, password };
  const token = jwt.sign(userDetails, KEY);
  res.status(200).json({ token });
}
