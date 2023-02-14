import { User } from "@prisma/client";
import { sign, verify, JwtPayload } from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET as string;

export const encodeJwt = (user: User) => {
  const token = sign(user, secretKey);
  return token;
};

export const decodeJwt = (token: string) => {
  const decodedToken = verify(token, secretKey) as JwtPayload;
  const user: User = {
    id: decodedToken.id,
    username: decodedToken.username,
    email: decodedToken.email,
    password: decodedToken.password,
    createdAt: decodedToken.createdAt,
  };
  return user;
};
