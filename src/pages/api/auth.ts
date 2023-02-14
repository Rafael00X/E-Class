// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  decodeJwt,
  encodeJwt,
  setTokenToCookie,
  getTokenFromCookie,
} from "@/modules/auth";
import { createUser, getUserByEmail } from "@/modules/database";
import { User } from "@prisma/client";

type Data = {
  user?: User;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const task = req.query.task;
  switch (task) {
    case "login":
      return login(req, res);
    case "register":
      return register(req, res);
    case "validate":
      return validate(req, res);
    default:
      return res.status(400).json({ message: "Invalid request" });
  }
}

const login = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Invalid request" });

  const user = await getUserByEmail(email);
  if (!user) return res.status(404).json({ message: "Email not registered" });
  if (user.password !== password)
    return res.status(401).json({ message: "Invalid credentials" });
  const token = encodeJwt(user);
  setTokenToCookie(res, token);
  res.status(200).json({ user });
};

const register = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "Invalid request" });

  try {
    const user = await createUser(name, email, password);
    const token = encodeJwt(user);
    setTokenToCookie(res, token);
    res.status(201).json({ user });
  } catch (error) {
    res.status(409).json({ message: "User already exists" });
  }
};

const validate = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const token = getTokenFromCookie(req);
    if (!token)
      return res.status(400).json({ message: "Jwt token not found in header" });
    const user = decodeJwt(token);
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
