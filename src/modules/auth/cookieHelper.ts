import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

const cookieName = process.env.AUTH_COOKIE_NAME || "eclass_jwt_cookie";

export const setTokenToCookieInNextApiResponse = (
  res: NextApiResponse<any>,
  token: string
) => {
  const cookie = serialize(cookieName, token, {
    httpOnly: true,
    path: "/",
  });
  res.setHeader("Set-Cookie", cookie);
};

export const getTokenFromCookieInNextApiRequest = (req: NextApiRequest) => {
  const token = req.cookies[cookieName];
  return token;
};

export const getTokenFromCookieInNextRequest = (req: NextRequest) => {
  const token = req.cookies.get(cookieName)?.value;
  return token;
};

export const deleteCookieInNextResponse = (res: NextResponse) => {
  const cookie = serialize(cookieName, "", {
    maxAge: 0,
    path: "/",
  });
  res.headers.set("Set-Cookie", cookie);
};
