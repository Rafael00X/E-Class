import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { serialize } from "cookie";

const cookieName = process.env.AUTH_COOKIE_NAME || "eclass_jwt_cookie";

export const setTokenToCookie = (res: NextApiResponse<any>, token: string) => {
  const cookie = serialize(cookieName, token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
  res.setHeader("Set-Cookie", cookie);
};

export const getTokenFromCookie = (req: NextApiRequest) => {
  const token = req.cookies[cookieName];
  return token;
};

export const getTokenFromCookieInMiddleware = (req: NextRequest) => {
  const token = req.cookies.get(cookieName)?.value;
  return token;
};
