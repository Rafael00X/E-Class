import { User } from "@prisma/client";
import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const alg = process.env.JWT_ALGO || "HS256";
const expTime = process.env.JWT_EXPIRATION_TIME || "30d";

export const encodeJwt = async (user: User) => {
  const token = await new SignJWT(user)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime(expTime)
    .sign(secret);
  return token;
};

export const decodeJwt = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, secret);
    const user = {
      id: payload.id as string,
      username: payload.username as string,
      email: payload.email as string,
    };
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
};
