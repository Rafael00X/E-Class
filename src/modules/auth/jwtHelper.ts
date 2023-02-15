import { User } from "@prisma/client";
import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const alg = process.env.JWT_ALGO || "HS256";

export const encodeJwt = async (user: User) => {
  const token = await new SignJWT(user)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secret);
  return token;
};

export const decodeJwt = async (token: string) => {
  const { payload } = await jwtVerify(token, secret);
  const user: User = {
    id: payload.id as string,
    username: payload.username as string,
    email: payload.email as string,
    password: payload.password as string,
    createdAt: payload.createdAt as Date,
  };
  return user;
};
