import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

const KEY = "ahdsahdkadadkadksadadkhasdads";

export const encodeJwt = (user: User) => {
  const token = jwt.sign(user, KEY);
  return token;
};

export const decodeJwt = (token: string) => {
  const decodedToken = jwt.verify(token, KEY) as jwt.JwtPayload;
  const user: User = {
    id: decodedToken.id,
    username: decodedToken.username,
    email: decodedToken.email,
    password: decodedToken.password,
    createdAt: decodedToken.createdAt,
  };
  return user;
};
