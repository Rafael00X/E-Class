import { Classroom } from "./classroom";
import { User as UserPrisma } from "@prisma/client";

export type User = {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  classrooms?: Classroom[];
};

export type UserPreview = {
  id: string;
  username: string;
  email: string;
};

export const userPreviewMapper = (user: UserPrisma) => {
  const data: UserPreview = {
    id: user.id,
    username: user.username,
    email: user.email,
  };
  return data;
};
