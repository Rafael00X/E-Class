import type { NextApiRequest, NextApiResponse } from "next";
import { getUserByEmail } from "@/modules/database";
import { encodeJwt } from "@/modules/auth";
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
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Invalid request" });

  const user = await getUserByEmail(email);
  if (!user) return res.status(404).json({ message: "Email not registered" });
  if (user.password !== password)
    return res.status(401).json({ message: "Invalid credentials" });
  const token = encodeJwt(user);
  res.status(200).json({ token, user });
}
