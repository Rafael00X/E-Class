import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

const cookieName = process.env.COOKIE_NAME as string;

export const setTokenToCookie = (res: NextApiResponse<any>, token: string) => {
  const cookie = serialize(cookieName, token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
  });
  res.setHeader("Set-Cookie", cookie);
};

export const getTokenFromCookie = (req: NextApiRequest) => {
  const token = req.cookies[cookieName];
  return token;
};
