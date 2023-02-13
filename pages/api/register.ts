import type { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "@/prisma";
import { encodeJwt } from "../../utilities/jwtHelper";
import { User } from "@prisma/client";

type Data = {
  token?: string;
  user?: User;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "Invalid request" });

  try {
    const user = await createUser(name, email, password);
    const token = encodeJwt(user);
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(409).json({ message: "User already exists" });
  }
}
